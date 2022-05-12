using System.ComponentModel.DataAnnotations.Schema;

namespace Models
{
  public class Attachment
  {
    public Attachment(string id, string name, string todoId)
    {
      this.Id = id;
      this.Name = name;
      this.TodoId = todoId;
    }
    public string Id { get; set; }
    public string Name { get; set; }
    public string TodoId { get; set; }
  }
}