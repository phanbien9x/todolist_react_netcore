<h1>Todolist webapi with netcore framework:</h1>
<h3>1. Technical:</h3>

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
<h3>2. Integrated Swagger and document</h3>
<h3>3. Integrated Jwt token (Bearer token)</h3>
<h3>4. Functionality</h3>

- Register, Login with User (Have roles for identify able to access)
- CRUD with todolist
- Cors, Bearer token and integrated them to swagger
- Migrage data base
<h3>5. Steps detail guide and CLI command</h3>

- Prerequisites: Visual Studio Code, .NET 6.0 SDK, C# extension for VSCode

  https://dotnet.microsoft.com/en-us/download/dotnet/6.0

  - .NET CLI (Create a new web api)

  ```netcli
  dotnet new webapi -o TodoApi
  cd TodoApi
  dotnet dev-certs https --trust (Trust http development certificate)
  ```

  -> Add all required package

  Add this config to .vscode/launch.json configurations to open swagger after run

  ```json
  "launchBrowser": {
     "enabled": true,
     "args": "${auto-detect-url}",
     "windows": {
       "command": "cmd.exe",
       "args": "/C start ${auto-detect-url}/swagger"
     }
   }
  ```

  - .NET CLI

  ```netcli
  dotnet watch --no-hot-reload (to run and watch the changes of code)
  ```

- Change listening port in ./Properties/launchSetting.json
  and one more thing is delete default models and controllers

- Create Models (User and Todo) inside folder ./Models
- Create Context for models inside folder ./Contexts

- Create database migrations from models

  - .NET CLI

  ```netcli
  dotnet tool install --global dotnet-ef (Install Entity Framkework CLI)
  dotnet ef Migrations add InitialCreate (Create new migration with comment)
  dotnet ef database update (Run whenever models change)
  ```

- Scaffold controllers

  - .NET CLI

  ```netcli
  dotnet aspnet-codegenerator controller -name <Controller_Name> -async -api -m <Model_Name> -dc <CONTEXT_NAME> -outDir Controllers
  ```

- Integrated Authentication (Bearer token)

  - Add JWT config to ./Properties/appsetting.json

  ```json
    "Jwt": {
      "Key": "B7nr1zazgnqfxzvgSISz0fzzimrK3pM8uLVfVqKr",
      "Issuer": "http://localhost:44360",
      "Audience": "http://localhost:44360"
    }
  ```

  - Add Authenticate config to ./Program.cs

  ```c#
    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
    {
      options.TokenValidationParameters = new TokenValidationParameters()
      {
        ValidateActor = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = builder.Configuration["Jwt:Issuer"],
        ValidAudience = builder.Configuration["Jwt:Audience"],
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
      };
    });
  ```

  - Add authentication require for controller only allow user have Role "Admin"

  ```c#
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
  ```

  - Add config to ./Program.cs to integrated bearer token for swagger

  ```c#
    builder.Services.AddSwaggerGen(options =>
    {
      options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
      {
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Description = "Bearer Authentication with JWT token",
        Type = SecuritySchemeType.Http
      });
      options.AddSecurityRequirement(new OpenApiSecurityRequirement
      {
        {
          new OpenApiSecurityScheme
          {
            Reference = new OpenApiReference
            {
              Id = "Bearer",
              Type = ReferenceType.SecurityScheme
            }
          },
          new List<string>()
        }
      });
    });
    ...
    app.UseAuthentication(); (to use authentication below UseAuthorization)
  ```

  - Return access token for login response
    - Create token string

  ```c#
      var claims = new[]
      {
        new Claim(ClaimTypes.NameIdentifier, userinfo.Username),
        new Claim(ClaimTypes.Email, userinfo.Email),
        new Claim(ClaimTypes.Role, userinfo.Role),
      };

      var token = new JwtSecurityToken
      (
        issuer: _configuration["JWt:Issuer"],
        audience: _configuration["JWt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddDays(30),
        notBefore: DateTime.UtcNow,
        signingCredentials: new SigningCredentials(
          new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"])),
          SecurityAlgorithms.HmacSha256
        )
      );

      var tokenString = new JwtSecurityTokenHandler().WriteToken(token);
  ```

  - Add document for swagger
    - Add config to allow create document file (inside your .scproj file)

  ```xml
      <PropertyGroup>
        <GenerateDocumentationFile>true</GenerateDocumentationFile>
        <NoWarn>$(NoWarn);1591</NoWarn>
      </PropertyGroup>
  ```

  - Config swagger to allow xml comment inside ./Program.cs AddSwaggerGen

  ```c#
    options.SwaggerDoc("v1", new OpenApiInfo
    {
      Version = "v1",
      Title = "ToDo API",
      Description = "An ASP.NET Core Web API for managing ToDo items",
      TermsOfService = new Uri("https://example.com/terms"),
      Contact = new OpenApiContact
      {
        Name = "Example Contact",
        Url = new Uri("https://example.com/contact")
      },
      License = new OpenApiLicense
      {
        Name = "Example License",
        Url = new Uri("https://example.com/license")
      }
    });
    var xmlFilename = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    options.IncludeXmlComments(Path.Combine(AppContext.BaseDirectory, xmlFilename));
  ```

  - Add Cross origin sharing resource (Cors) inside ./Program.cs file

  ```c#
    builder.Services.AddCors(options =>
    {
      options.AddPolicy(name: "MyPolicy",
        policy =>
        {
          policy.WithOrigins("http://localhost:3000").AllowAnyHeader().AllowAnyMethod();
        });
    });
    ...
    app.UseCors("MyPolicy");
  ```

<h3>6. Additional part</h3>

  - Create SMPT server to send email
  - Login with auth
<h3>7. Show file in physical path without authenticate</h3>

  ```c#
  app.UseStaticFiles(new StaticFileOptions
  {
    FileProvider = new PhysicalFileProvider(Path.Combine(builder.Environment.ContentRootPath, "Upload")),
    RequestPath = "/attachment"
  });
  ```
<h3>8. Firebase clound messaging</h3>

  - Add config to program.cs
    ```c#
    FirebaseApp.Create(new AppOptions() {
      Credential = GoogleCredential.FromFile("service-account-file.json"),
    });
    ```
  - Send notification
    ```c#
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
      await FirebaseMessaging.DefaultInstance.SendAsync(message);
    ```
<h3>9. Background service (Hangfire)</h3>

  - Install packages: Hangfire.AspNetCore, Hangfire.Core, Hangfire.SqlServer
  - Add hangfire service to program.cs
    ```c#
    builder.Services.AddHangfire(configuration => configuration
    .SetDataCompatibilityLevel(CompatibilityLevel.Version_170)
    .UseSimpleAssemblyNameTypeSerializer()
    .UseRecommendedSerializerSettings()
    .UseSqlServerStorage(builder.Configuration.GetConnectionString("TodoApiDatabase"), new SqlServerStorageOptions
    {
      CommandBatchMaxTimeout = TimeSpan.FromMinutes(5),
      SlidingInvisibilityTimeout = TimeSpan.FromMinutes(5),
      QueuePollInterval = TimeSpan.Zero,
      UseRecommendedIsolationLevel = true,
      DisableGlobalLocks = true
    }));
    builder.Services.AddHangfireServer();
    builder.Services.AddScoped<ScopedNotify>();
    ...
    app.UseHangfireDashboard();
    ```

<h3>10. Deploy to azure web service</h3>

  - Create the App Service

    ```azurecli
    az group create --location eastus --name andy-todoapi

    az appservice plan create --name andy-todoapi-plan-123 --resource-group andy-todoapi --sku F1

    az webapp create --name andy-todoapi --runtime "DOTNET|6.0" --plan andy-todoapi-plan-123 --resource-group andy-todoapi

    az sql server create --location eastus --resource-group andy-todoapi --name andy-todoapi --admin-user andy --admin-password admin@123

    az sql db create --resource-group andy-todoapi --server andy-todoapi --name TodoApi

    az sql server firewall-rule create --resource-group andy-todoapi --server andy-todoapi --name AzureAccess --start-ip-address 0.0.0.0 --end-ip-address 0.0.0.0

    az sql db show-connection-string --client ado.net --name TodoApi --server andy-todoapi

    az webapp config connection-string set -g andy-todoapi -n andy-todoapi -t SQLServer --settings TodoApiDatabase="Server=tcp:andy-todoapi.database.windows.net,1433;Database=TodoApi;User ID=andy;Password=admin@123;Encrypt=true;Connection Timeout=30;"

    az sql server firewall-rule create --resource-group andy-todoapi --server andy-todoapi --name LocalAccess --start-ip-address 118.70.52.28 --end-ip-address 118.70.52.28

    dotnet ef database update
    ```
