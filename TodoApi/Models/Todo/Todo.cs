namespace Models
{
  public class Todo
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Priority { get; set; }
    public bool? Completed { get; set; }
    public DateTime? DueDate { get; set; } = DateTime.Today;
    public string Attachment { get; set; }
    public void getDataFrom(TodoBody data)
    {
      if (data.Name != null) this.Name = data.Name;
      if (data.Priority != null) this.Priority = data.Priority;
      if (data.Completed != null) this.Completed = data.Completed;
      if (data.DueDate != null) this.DueDate = data.DueDate;
      if (data.Attachment != null) this.Attachment = data.Attachment;
    }
  }
}