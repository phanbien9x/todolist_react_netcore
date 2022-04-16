using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datacontext;
using Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace TodoApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IConfiguration _configuration;
    private readonly TodoApiContext _context;

    public AuthController(TodoApiContext context, IConfiguration configuration)
    {
      _context = context;
      _configuration = configuration;
    }

    // POST: api/Auth
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<User>> Login(LoginBody body)
    {
      var userinfo = await GetUser(body);
      if (userinfo == null) return NotFound();
      var claims = new[]
      {
        new Claim(ClaimTypes.NameIdentifier, userinfo.Username),
        new Claim(ClaimTypes.Email, userinfo.Email),
        new Claim(ClaimTypes.Role, userinfo.Role),
      };

      var token = new JwtSecurityToken
      (
        issuer: _configuration["JWt:Issuer"],
        audience: _configuration["JWt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddDays(30),
        notBefore: DateTime.UtcNow,
        signingCredentials: new SigningCredentials(
          new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
          SecurityAlgorithms.HmacSha256
        )
      );

      var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
      userinfo.Access_token = tokenString;
      _context.Entry(userinfo).State = EntityState.Modified;
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }
      return Ok(tokenString);
    }

    private async Task<User> GetUser(LoginBody body)
    {
      return await _context.Users.FirstOrDefaultAsync(o => o.Username.Equals(body.Username) && o.Password.Equals(body.Password));
    }
    private bool UserExists(LoginBody body)
    {
      return _context.Users.Any(e => e.Username == body.Username);
    }
  }
}
