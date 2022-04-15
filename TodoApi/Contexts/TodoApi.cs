using Microsoft.EntityFrameworkCore;
using Models;

namespace Datacontext
{
  public class TodoApiContext : DbContext
  {
    public TodoApiContext(DbContextOptions<TodoApiContext> options) : base(options) { }
    public DbSet<Todo> Todos { get; set; } = null;
    public DbSet<User> Users { get; set; } = null;
  }
}