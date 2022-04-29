using Microsoft.EntityFrameworkCore;
using Models;

namespace Datacontext
{
  public class TodoApiContext : DbContext
  {
    public TodoApiContext(DbContextOptions<TodoApiContext> options) : base(options) { }

    override protected void OnModelCreating(ModelBuilder modelBuilder)
    {
      base.OnModelCreating(modelBuilder);
      // modelBuilder.Entity<Todo>()
      //   .HasOne<User>()
      //   .WithMany()
      //   .HasForeignKey("Username");

      // modelBuilder.Entity<User>()
      //   .HasIndex(e => e.Username)
      //   .IsUnique();

    }

    public DbSet<Todo> Todos { get; set; } = null;
    public DbSet<Attachment> Attachments { get; set; } = null;
    public DbSet<User> Users { get; set; } = null;
  }
}