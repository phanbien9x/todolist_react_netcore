using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datacontext;
using Models;

namespace TodoApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class AuthController : ControllerBase
  {
    private readonly TodoApiContext _context;

    public AuthController(TodoApiContext context)
    {
      _context = context;
    }

    // POST: api/Auth
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<User>> Login(LoginBody body)
    {
      var userinfo = await GetUser(body);
      if (userinfo == null) return NotFound();
      userinfo.Access_token = "access_token";
      _context.Entry(userinfo).State = EntityState.Modified;
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }
      return NoContent();
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
