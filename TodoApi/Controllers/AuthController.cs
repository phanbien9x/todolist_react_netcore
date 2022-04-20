using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datacontext;
using Models;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;

namespace TodoApi.Controllers
{
  [Route("api/")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly IConfiguration _configuration;
    private readonly TodoApiContext _context;
    private readonly EmailService _emailService;

    public AuthController(TodoApiContext context, IConfiguration configuration)
    {
      _context = context;
      _configuration = configuration;
      _emailService = new EmailService(_configuration);
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
      newUser.Password = this.hashPassword(body.Password);
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
    public async Task<ActionResult<UserResponse>> Login(LoginBody body)
    {
      var userinfo = await GetUser(body.Username);
      if (userinfo == null || !this.verifyPassword(body.Password, userinfo.Password)) return NotFound("Invalid username or password!");
      var claims = new[]
      {
        new Claim(ClaimTypes.NameIdentifier, userinfo.Username),
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
      return Ok(UserResponse.getDataFrom(userinfo));
    }

    // POST: api/Auth
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Get verification link to change password.
    /// </summary>
    [HttpPost]
    [Route("recover-password")]
    public async Task<ActionResult<User>> Recover(RecoverPasswordBody body)
    {
      var selected = await _context.Users.FirstOrDefaultAsync(o => o.Username.Equals(body.Username) && o.Email.Equals(body.Email));
      if (selected == null) return NotFound("Invalid username or email!");
      string code = Guid.NewGuid().ToString();
      selected.VerificationCode = code;
      _context.Entry(selected).State = EntityState.Modified;
      try
      {
        await _context.SaveChangesAsync();
        _emailService.Send(body.Email, "You have a password reset request from TodoApi", $"Reset password link:\n http://localhost:3000/reset-password/{code}");
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }
      return Ok("Check your email to get reset password link");
    }

    // PATCH: api/Auth
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Reset password by verification code.
    /// </summary>
    [HttpPatch]
    [Route("reset-password/{code}")]
    public async Task<ActionResult<User>> ResetPassword(string code, ResetPasswordBody body)
    {
      var selected = await _context.Users.FirstOrDefaultAsync(o => o.VerificationCode.Equals(code));
      if (selected == null) return NotFound("Invalid username or verification code!");
      selected.Password = this.hashPassword(body.NewPassword);
      selected.VerificationCode = null;
      _context.Entry(selected).State = EntityState.Modified;
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }
      return Ok("Password has been successfully changed!");
    }

    // PATCH: api/Auth
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Change password with current password.
    /// </summary>
    [HttpPatch]
    [Route("change-password")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<ActionResult<User>> ChangePassword(ChangePasswordBody body)
    {
      var userinfo = await _context.Users.FirstOrDefaultAsync(o => o.Username.Equals(User.FindFirstValue(ClaimTypes.NameIdentifier)));
      if (userinfo == null || !this.verifyPassword(body.CurrentPassword, userinfo.Password)) return NotFound("Invalid username or current password!");
      userinfo.Password = this.hashPassword(body.NewPassword);
      _context.Entry(userinfo).State = EntityState.Modified;
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }
      return Ok("Password has been successfully changed!");
    }

    // POST: api/Auth
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Login to get access token.
    /// </summary>
    [HttpGet]
    [Route("logout")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<ActionResult<User>> Logout()
    {
      string username = User.FindFirstValue(ClaimTypes.NameIdentifier);
      var userinfo = await _context.Users.FindAsync(username);
      if (userinfo == null) return NotFound("Invalid username!");
      userinfo.Access_token = null;
      _context.Entry(userinfo).State = EntityState.Modified;
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }
      return Ok("Logout successful!");
    }

    private async Task<User> GetUser(string username)
    {
      return await _context.Users.FirstOrDefaultAsync(o => o.Username.Equals(username));
    }
    private bool UserExists(RegisterBody body)
    {
      return _context.Users.Any(e => e.Username == body.Username);
    }
    private bool verifyPassword(string plaintext, string hashcode)
    {
      return BCrypt.Net.BCrypt.Verify(plaintext + _configuration["Jwt:Key"], hashcode);
    }
    private string hashPassword(string plaintext)
    {
      return BCrypt.Net.BCrypt.HashPassword(plaintext + _configuration["JWt:Key"]);
    }
  }
}
