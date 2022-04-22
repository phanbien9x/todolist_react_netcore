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
    public bool? Completed { get; set; }
    public DateTime? DueDate { get; set; } = DateTime.Today;
    public void getDataFrom(TodoBody data)
    {
      if (data.Name != null) this.Name = data.Name;
      if (data.Priority != null) this.Priority = data.Priority;
      if (data.Completed != null) this.Completed = data.Completed;
      if (data.DueDate != null) this.DueDate = data.DueDate;
    }
    public string UserId { get; set; }
    public virtual ICollection<Attachment> Attachments { get; set; }
  }
}