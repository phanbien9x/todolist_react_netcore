using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datacontext;
using Models;
using System.Security.Claims;
using TodoApi.ScopedServices;
using Hangfire;

namespace TodoApi.Controllers
{
  [Route("api/todo")]
  [ApiController]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  public class TodoController : ControllerBase
  {
    private readonly TodoApiContext _context;
    private IWebHostEnvironment _environment;
    private ScopedNotify _scopedNotify;

    public TodoController(TodoApiContext context, IWebHostEnvironment environment, ScopedNotify scopedNotify)
    {
      _context = context;
      _scopedNotify = scopedNotify;
      _environment = environment;
    }

    // GET: api/todo
    /// <summary>
    /// Get multiple todo item.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
      var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
      return await _context.Todos.Where(o => o.Username == username).OrderBy(o => o.DueDate).ToListAsync();
    }

    // GET: api/todo/5
    /// <summary>
    /// Get a specific todo item.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodo(string id)
    {
      var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
      var todo = await _context.Todos.Include(item => item.Attachments).FirstOrDefaultAsync(o => o.Username == username && o.Id == id);
      if (todo == null)
      {
        return NotFound();
      }

      return todo;
    }

    // PATCH: api/todo/5
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Update a specific todo item.
    /// </summary>
    [HttpPatch("{id}")]
    public async Task<ActionResult<Todo>> PatchTodo(string id, TodoBody body)
    {
      var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
      var selectedTodo = await _context.Todos.FirstOrDefaultAsync(o => o.Username == username && o.Id == id);
      if (selectedTodo == null) return NotFound();
      bool dueDateChanged = selectedTodo.DueDate != body.DueDate;
      selectedTodo.getDataFrom(body);
      _context.Entry(selectedTodo).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
        if (dueDateChanged) { await _scopedNotify.reScheduleNotifyTodo(selectedTodo); }
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }

      return selectedTodo;
    }

    // POST: api/todo/attachment
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Upload a todo's attachment
    /// </summary>
    [HttpPost]
    [Route("{id}/attachment")]
    public async Task<ActionResult<Attachment>> PostAttachment(string id, IFormFile file)
    {
      var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
      var selectedTodo = await _context.Todos.FirstOrDefaultAsync(o => o.Username == username && o.Id == id);
      if (selectedTodo == null) return NotFound("Not found this todo item!");
      DateTimeOffset now = (DateTimeOffset)DateTime.UtcNow;
      string newFileName = now.ToString("dd-MM-yyyy-HH-mm-ss__") + file.FileName;
      var filePath = Path.GetFullPath(@$"{_environment.ContentRootPath}/Upload/{newFileName}");
      Attachment attachment = new Attachment(Guid.NewGuid().ToString(), newFileName, selectedTodo.Id);
      try
      {
        if (file.Length > 0)
        {
          using (var stream = System.IO.File.Create(filePath))
          {
            await file.CopyToAsync(stream);
          }
        }
        _context.Attachments.Add(attachment);
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        System.IO.File.Delete(filePath);
        return Problem(ex.ToString());
      }

      return Ok(attachment);
    }

    // DELETE: api/todo/attachment
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Delete a todo's attachment
    /// </summary>
    [HttpDelete]
    [Route("attachment/{id}")]
    public async Task<ActionResult<Todo>> DeleteAttachment(string id)
    {
      var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
      var selectedTodos = await _context.Todos.Where(o => o.Username == username).Select(o => o.Id).ToListAsync();
      Attachment selectedAttachment = await _context.Attachments.FirstOrDefaultAsync(o => selectedTodos.Contains(o.TodoId) && o.Id == id);
      if (selectedAttachment == null) return NotFound();
      _context.Attachments.Remove(selectedAttachment);
      string filePath = Path.GetFullPath(@$"{_environment.ContentRootPath}/Upload/{selectedAttachment.Name}");
      try
      {
        await _context.SaveChangesAsync();
        System.IO.File.Delete(filePath);
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }

      return Ok("Attachment has been deleted!");
    }

    // POST: api/todo
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    /// <summary>
    /// Add new Todo item.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Todo>> PostTodo(TodoBody body)
    {
      //User.Identity.Name;
      var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
      //var userinfo = await _context.Users.FirstOrDefaultAsync(o => o.Username.Equals(username));
      Todo newTodo = new Todo();
      newTodo.getDataFrom(body);
      newTodo.Id = Guid.NewGuid().ToString();
      newTodo.Username = username;
      _context.Todos.Add(newTodo);
      try
      {
        await _context.SaveChangesAsync();
        await _scopedNotify.scheduleNotifyTodo(newTodo);
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }

      return CreatedAtAction("GetTodo", new { id = newTodo.Id }, newTodo);
    }

    // DELETE: api/todo/5
    /// <summary>
    /// Delete a specific todo item.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult<Todo>> DeleteTodo(string id)
    {
      var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
      var todo = await _context.Todos.FirstOrDefaultAsync(o => o.Username == username && o.Id == id);
      ICollection<Attachment> attachments = await _context.Attachments.Where(o => o.TodoId == id).ToListAsync();
      if (todo == null)
      {
        return NotFound();
      }

      _context.Todos.Remove(todo);
      try
      {
        foreach (var attachment in attachments)
        {
          await DeleteAttachment(attachment.Id);
        }
        await _context.SaveChangesAsync();
        BackgroundJob.Delete(todo.JobId);
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }

      return todo;
    }
  }
}
