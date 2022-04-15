using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Datacontext;
using Models;

namespace TodoApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class TodoController : ControllerBase
  {
    private readonly TodoApiContext _context;

    public TodoController(TodoApiContext context)
    {
      _context = context;
    }

    // GET: api/Todo
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Todo>>> GetTodos()
    {
      return await _context.Todos.ToListAsync();
    }

    // GET: api/Todo/5
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
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchTodo(string id, Todo todo)
    {
      if (id != todo.Id)
      {
        return BadRequest();
      }

      _context.Entry(todo).State = EntityState.Modified;

      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateConcurrencyException)
      {
        if (!TodoExists(id))
        {
          return NotFound();
        }
        else
        {
          throw;
        }
      }

      return NoContent();
    }

    // POST: api/Todo
    // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
    [HttpPost]
    public async Task<ActionResult<Todo>> PostTodo(Todo todo)
    {
      _context.Todos.Add(todo);
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (DbUpdateException)
      {
        if (TodoExists(todo.Id))
        {
          return Conflict();
        }
        else
        {
          throw;
        }
      }

      return CreatedAtAction("GetTodo", new { id = todo.Id }, todo);
    }

    // DELETE: api/Todo/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(string id)
    {
      var todo = await _context.Todos.FindAsync(id);
      if (todo == null)
      {
        return NotFound();
      }

      _context.Todos.Remove(todo);
      await _context.SaveChangesAsync();

      return NoContent();
    }

    private bool TodoExists(string id)
    {
      return _context.Todos.Any(e => e.Id == id);
    }
  }
}
