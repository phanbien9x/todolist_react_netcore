namespace Models
{
  public class ResetPasswordBody
  {
    public string Username { get; set; }
    public string NewPassword { get; set; }
    public string VerificationCode { get; set; }
  }
}