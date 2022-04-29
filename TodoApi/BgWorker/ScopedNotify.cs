using Datacontext;
using FirebaseAdmin.Messaging;
using Microsoft.EntityFrameworkCore;
using Models;
using Hangfire;

namespace TodoApi.ScopedServices
{
  public class ScopedNotify
  {
    private readonly ILogger _logger;
    private readonly TodoApiContext _context;
    public ScopedNotify(ILogger<ScopedNotify> logger, TodoApiContext context)
    {
      _logger = logger;
      _context = context;
    }
    public async Task scheduleNotifyTodo(Todo todo)
    {
      string newJobId = await scheduleNotify(todo);
      await updateJobId(newJobId, todo.Id);
    }
    public async Task reScheduleNotifyTodo(Todo todo)
    {
      BackgroundJob.Delete(todo.JobId);
      await scheduleNotifyTodo(todo);
    }
    public async Task<string> scheduleNotify(Todo todo)
    {
      string token = await this.RetrieveFcmToken(todo.UserId);
      return BackgroundJob.Schedule(() => fcmTo(token, todo), todo.DueDate);
    }
    public async Task updateJobId(string jobId, string todoId)
    {
      Todo selectedTodo = await _context.Todos.FindAsync(todoId);
      selectedTodo.JobId = jobId;
      _context.Entry(selectedTodo).State = EntityState.Modified;
      try
      {
        await _context.SaveChangesAsync();
      }
      catch (Exception ex)
      {
        _logger.LogError(ex.ToString());
      }
    }
    public async Task<IEnumerable<Todo>> retrieveTodos()
    {
      return await _context.Todos.ToListAsync();
    }
    public async Task<string> RetrieveFcmToken(string id)
    {
      User userinfo = await _context.Users.FindAsync(id);
      return userinfo.Fcm_token;
    }
    public async Task fcmTo(string token, Todo todo)
    {
      var message = new Message()
      {
        Data = new Dictionary<string, string>()
      {
        { "id", todo.Id },
        { "type", "todoExpired" },
      },
        Token = token,
        Notification = new Notification()
        {
          Title = "Todo expired!",
          Body = $"You forgot {todo.Name} check it now!",
        },
        Webpush = new WebpushConfig()
        {
          FcmOptions = new WebpushFcmOptions()
          {
            Link = $"https://localhost:3000/todo/{todo.Id}"
          }
        }
      };
      try
      {
        await FirebaseMessaging.DefaultInstance.SendAsync(message);
      }
      catch (Exception ex)
      {
        Console.WriteLine("send message error: " + ex);
      }
    }
  }
}