using System.ComponentModel.DataAnnotations;

namespace Models
{
  public class User
  {
    [Key]
    public string Username { get; set; }
    public string Password { get; set; }
    public string Access_token { get; set; }
    public string Role { get; set; }
    public string Email { get; set; }
    public string VerificationCode { get; set; }
    public void getDataFrom(LoginBody data)
    {
      if (data.Username != null) this.Username = data.Username;
      if (data.Password != null) this.Password = data.Password;
    }
    public void getDataFrom(RegisterBody data)
    {
      if (data.Username != null) this.Username = data.Username;
      if (data.Password != null) this.Password = data.Password;
      if (data.Email != null) this.Email = data.Email;
    }
  }
}