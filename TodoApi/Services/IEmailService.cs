using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;
using MimeKit.Text;

namespace Services
{
  public class EmailService
  {
    public readonly IConfiguration _configuration;

    public EmailService(IConfiguration configuration)
    {
      _configuration = configuration;
    }

    public void Send(string to, string subject, string html, string from = null)
    {
      // create message
      var email = new MimeMessage();
      email.From.Add(MailboxAddress.Parse(from ?? _configuration["Smtp:EmailFrom"]));
      email.To.Add(MailboxAddress.Parse(to));
      email.Subject = subject;
      email.Body = new TextPart(TextFormat.Html) { Text = html };

      // send email
      using var smtp = new SmtpClient();
      smtp.Connect(_configuration["Smtp:SmtpHost"], int.Parse(_configuration["Smtp:SmtpPort"]), SecureSocketOptions.StartTls);
      smtp.Authenticate(_configuration["Smtp:SmtpUser"], _configuration["Smtp:SmtpPass"]);
      smtp.Send(email);
      smtp.Disconnect(true);
    }
  }
}