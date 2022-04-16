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

    - Scaffold controllers
      * .NET CLI
      dotnet aspnet-codegenerator controller -name <Controller_Name> -async -api -m <Model_Name> -dc <CONTEXT_NAME> -outDir Controllers

    - Integrated Authentication (Bearer token)
      + Add JWT config to ./Properties/appsetting.json
        "Jwt": {
          "Key": "B7nr1zazgnqfxzvgSISz0fzzimrK3pM8uLVfVqKr",
          "Issuer": "http://localhost:44360",
          "Audience": "http://localhost:44360"
        }
      + Add Authenticate config to ./Program.cs
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
      + Add authentication require for controller only allow user have Role "Admin"
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme, Roles = "Admin")]
      + Add config to ./Program.cs to integrated bearer token for swagger
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
      + Return access token for login response
        * Create token string
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
      + Add document for swagger
        * Add config to allow create document file (inside your .scproj file)
          <PropertyGroup>
            <GenerateDocumentationFile>true</GenerateDocumentationFile>
            <NoWarn>$(NoWarn);1591</NoWarn>
          </PropertyGroup>
        * Config swagger to allow xml comment inside ./Program.cs AddSwaggerGen
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
      + Add Cross origin sharing resource (Cors)
        * Inside ./Program.cs file
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