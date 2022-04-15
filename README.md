=> THE PATH FOR NETCORE API

1. Recreate todolist webapi with netcore framework:
   Technical:
   - Netcore framework
   - Entity framework
     Tools:
   - Netcore CLI
   - Entity framework CLI
     Package:
   - Microsoft.VisualStudio.Web.CodeGeneration.Design
   - Swashbuckle.AspNetCore (For swagger) (Integrated)
   - Microsoft.EntityFrameworkCore.Design
   - Microsoft.EntityFrameworkCore.SqlServer
   - Microsoft.AspNet.WebApi.Cors
   - Microsoft.AspNetCore.Authentication.JwtBearer
   - Microsoft.IdentityModel.Tokens
   - System.IdentityModel.Tokens.Jwt
   - Microsoft.Extensions.Configuration.Json
2. Integrated Swagger and document
3. Integrated Jwt token (Bearer token)
4. Functionality
   - Register, Login with User (Have roles for identify able to access)
   - CRUD with todolist
   - Cors, Bearer token and integrated them to swagger
   - Migrage data base
5. Steps detail guide and CLI command
   Prerequisites: Visual Studio Code, .NET 6.0 SDK, C# extension for VSCode
   https://dotnet.microsoft.com/en-us/download/dotnet/6.0

   - .NET CLI (Create a new web api)
     dotnet new webapi -o TodoApi
     cd TodoApi
     dotnet dev-certs https --trust (Trust http development certificate)

     -> Add all required package

     Add this config to .vscode/launch.json configurations to open swagger after run
     "launchBrowser": {
        "enabled": true,
        "args": "${auto-detect-url}",
        "windows": {
          "command": "cmd.exe",
          "args": "/C start ${auto-detect-url}/swagger"
        }
      }

   dotnet watch --no-hot-reload (to run and watch the changes of code)
   can change listening port in ./Properties/launchSetting.json
   and one more thing is delete default models and controllers

   - Create Models (User and Todo) inside folder ./Models
   - Create Context for models inside folder ./Contexts

   - Create database migrations from models

   * .NET CLI
     dotnet tool install --global dotnet-ef (Install Entity Framkework CLI)
     dotnet ef Migrations add InitialCreate (Create new migration with comment)
     dotnet ef database update (Run whenever models change)
