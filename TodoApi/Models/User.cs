using System.ComponentModel.DataAnnotations;

namespace Models
{
  public class User
  {
    [Key]
    public string Username { get; set; }
    public string Password { get; set; }
    public string Role { get; set; }
    public string Email { get; set; }
  }
}