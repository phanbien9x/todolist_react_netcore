namespace Models
{
  public class ChangePasswordBody
  {
    public string CurrentPassword { get; set; }
    public string NewPassword { get; set; }
  }
}