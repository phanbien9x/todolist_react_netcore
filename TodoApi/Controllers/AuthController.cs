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
  [Route("api/")]
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
    /// <summary>
    /// Register new user.
    /// </summary>
    [HttpPost]
    [Route("register")]
    public async Task<ActionResult<User>> Register(RegisterBody body)
    {
      var newUser = new User();
      newUser.getDataFrom(body);
      _context.Users.Add(newUser);
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        if (UserExists(body))
        {
          return Conflict();
        }
        else
        {
          return Problem(ex.ToString());
        }
      }

      return Ok(newUser);
    }

    // POST: api/Auth
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Login to get access token.
    /// </summary>
    [HttpPost]
    [Route("login")]
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

    // POST: api/Auth
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Register new user.
    /// </summary>
    [HttpPost]
    [Route("forgot")]
    public async Task<ActionResult<User>> Forgot(ForgotBody body)
    {
      var selected = await _context.Users.FirstOrDefaultAsync(o => o.Username.Equals(body.Username) && o.Email.Equals(body.Email));
      if (selected == null) return NotFound();
      return Ok();
    }

    private async Task<User> GetUser(LoginBody body)
    {
      return await _context.Users.FirstOrDefaultAsync(o => o.Username.Equals(body.Username) && o.Password.Equals(body.Password));
    }
    private bool UserExists(RegisterBody body)
    {
      return _context.Users.Any(e => e.Username == body.Username);
    }
  }
}
