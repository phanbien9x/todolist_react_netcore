using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datacontext;
using Models;

namespace TodoApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  public class TodoController : ControllerBase
  {
    private readonly TodoApiContext _context;

    public TodoController(TodoApiContext context)
    {
      _context = context;
    }

    // GET: api/Todo
    /// <summary>
    /// Get multiple todo item.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
      return await _context.Todos.ToListAsync();
    }

    // GET: api/Todo/5
    /// <summary>
    /// Get a specific todo item.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<Todo>> GetTodo(string id)
    {
      var todo = await _context.Todos.FindAsync(id);

      if (todo == null)
      {
        return NotFound();
      }

      return todo;
    }

    // PATCH: api/Todo/5
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

    // POST: api/Todo
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

    // DELETE: api/Todo/5
    /// <summary>
    /// Delete a specific todo item.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(string id)
    {
      var todo = await _context.Todos.FindAsync(id);
      if (todo == null)
      {
        return NotFound();
      }

      _context.Todos.Remove(todo);
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

    private bool TodoExists(string id)
    {
      return _context.Todos.Any(e => e.Id == id);
    }
  }
}
