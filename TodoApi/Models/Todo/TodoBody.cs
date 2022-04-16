namespace Models
{
  public class TodoBody
  {
    public string Name { get; set; }
    public string Priority { get; set; }
    public bool? Completed { get; set; }
  }
}