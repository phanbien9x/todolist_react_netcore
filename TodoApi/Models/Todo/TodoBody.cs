namespace Models
{
  public class TodoBody
  {
    public string Name { get; set; }
    public string Priority { get; set; }
    public bool Completed { get; set; } = false;
    public DateTime DueDate { get; set; } = DateTime.Today;
  }
}