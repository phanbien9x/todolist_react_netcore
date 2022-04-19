using System.ComponentModel.DataAnnotations;

namespace Models
{
  public class UserResponse
  {
    [Key]
    public string Username { get; set; }
    public string Access_token { get; set; }
    public string Role { get; set; } = "User";
    public string Email { get; set; }
    public static UserResponse getDataFrom(User data)
    {
      UserResponse parsedData = new UserResponse();
      if (data.Username != null) parsedData.Username = data.Username;
      if (data.Access_token != null) parsedData.Access_token = data.Access_token;
      if (data.Role != null) parsedData.Role = data.Role;
      if (data.Email != null) parsedData.Email = data.Email;
      return parsedData;
    }
  }
}