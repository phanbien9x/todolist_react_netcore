using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datacontext;
using Models;
using System.Security.Claims;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace TodoApi.Controllers
{
  [Route("api/user-info")]
  [ApiController]
  public class UserInfoController : ControllerBase
  {
    private readonly IConfiguration _configuration;
    private readonly TodoApiContext _context;
    private readonly EmailService _emailService;

    public UserInfoController(TodoApiContext context, IConfiguration configuration)
    {
      _context = context;
      _configuration = configuration;
    }

    // GET: api/Auth
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Get userinfo with access_token
    /// </summary>
    [HttpGet]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<ActionResult<User>> GetUserInfo()
    {
      var userinfo = await _context.Users.FirstOrDefaultAsync(o => o.Username.Equals(User.FindFirstValue(ClaimTypes.NameIdentifier)));
      if (userinfo == null) return NotFound("Invalid username!");
      return Ok(UserResponse.getDataFrom(userinfo));
    }

    // POST: api/Auth
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Change userinfo with current password
    /// </summary>
    [HttpPatch]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<ActionResult<User>> ChangeUserInfo(ChangeUserInfoBody body)
    {
      var userinfo = await _context.Users.FirstOrDefaultAsync(o => o.Username.Equals(User.FindFirstValue(ClaimTypes.NameIdentifier)));
      if (userinfo == null || !this.verifyPassword(body.Password, userinfo.Password)) return NotFound("Invalid username or password!");
      userinfo.Email = body.Email;
      _context.Entry(userinfo).State = EntityState.Modified;
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }
      return Ok(UserResponse.getDataFrom(userinfo));
    }
    private bool verifyPassword(string plaintext, string hashcode)
    {
      return BCrypt.Net.BCrypt.Verify(plaintext + _configuration["Jwt:Key"], hashcode);
    }
  }
}
