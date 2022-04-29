using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
  public class Todo
  {
    public Todo()
    {
      this.Attachments = new HashSet<Attachment>();
    }
    public string Id { get; set; }
    public string Name { get; set; }
    public string Priority { get; set; }
    public bool Completed { get; set; } = false;
    public DateTime DueDate { get; set; } = DateTime.Today;
    public string JobId { get; set; }
    public void getDataFrom(TodoBody data)
    {
      if (data.Name != null) this.Name = data.Name;
      if (data.Priority != null) this.Priority = data.Priority;
      this.Completed = data.Completed;
      this.DueDate = data.DueDate;
    }
    public string UserId { get; set; }
    public virtual ICollection<Attachment> Attachments { get; set; }

    // [ForeignKey("Username")]
    // public virtual User User{get;set;}
  }
}