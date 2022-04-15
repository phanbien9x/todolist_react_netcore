namespace Models
{
  public class Todo
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Priority { get; set; }
    public bool? Completed { get; set; }
    public void getDataFrom(TodoBody data)
    {
      if (data.Name != null) Name = data.Name;
      if (data.Priority != null) Priority = data.Priority;
      if (data.Completed != null) Completed = data.Completed;
    }
  }
}