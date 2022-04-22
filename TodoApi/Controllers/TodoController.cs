using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datacontext;
using Models;

namespace TodoApi.Controllers
{
  [Route("api/todo")]
  [ApiController]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
  public class TodoController : ControllerBase
  {
    private readonly TodoApiContext _context;
    private IWebHostEnvironment _environment;

    public TodoController(TodoApiContext context, IWebHostEnvironment environment)
    {
      _context = context;
      _environment = environment;
    }

    // GET: api/todo
    /// <summary>
    /// Get multiple todo item.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
      return await _context.Todos.OrderBy(o => o.DueDate).ToListAsync();
    }

    // GET: api/todo/5
    /// <summary>
    /// Get a specific todo item.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodo(string id)
    {
      var todo = await _context.Todos.FindAsync(id);
      ICollection<Attachment> attachment = await _context.Attachments.Where(o => o.TodoId == id).ToListAsync();
      todo.Attachments = attachment;

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
    public async Task<ActionResult<Todo>> PatchTodo(string id, TodoBody todo)
    {
      var selectedTodo = await _context.Todos.FindAsync(id);
      if (selectedTodo == null) return NotFound();

      selectedTodo.getDataFrom(todo);
      _context.Entry(selectedTodo).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
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
      var selectedTodo = await _context.Todos.FindAsync(id);
      if (selectedTodo == null) return NotFound();
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
      Attachment selectedAttachment = await _context.Attachments.FindAsync(id);
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
    public async Task<ActionResult<Todo>> PostTodo(Todo todo)
    {
      _context.Todos.Add(todo);
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        if (TodoExists(todo.Id))
        {
          return Conflict();
        }
        else
        {
          return Problem(ex.ToString());
        }
      }

      return CreatedAtAction("GetTodo", new { id = todo.Id }, todo);
    }

    // DELETE: api/todo/5
    /// <summary>
    /// Delete a specific todo item.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<ActionResult<Todo>> DeleteTodo(string id)
    {
      var todo = await _context.Todos.FindAsync(id);
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
      }
      catch (Exception ex)
      {
        return Problem(ex.ToString());
      }

      return todo;
    }

    private bool TodoExists(string id)
    {
      return _context.Todos.Any(e => e.Id == id);
    }
  }
}
