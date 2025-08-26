using PaisesAPI.Data;
using PaisesAPI.Services;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options => 
{
    options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;
}); // Adicionar suporte a controllers
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configurar Entity Framework
builder.Services.AddDbContext<PaisesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Registrar Services
builder.Services.AddScoped<IPaisService, PaisService>();

// Configurar CORS para permitir requisições do ExtJS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowExtJS", policy =>
    {
        policy.WithOrigins(
                "http://localhost:3000",    // Para desenvolvimento local
                "http://127.0.0.1:5500",    // Live Server
                "http://localhost:5500",    // Live Server (alternativo)
                "file://",                  // Para arquivos HTML locais
                "null"                      // Para arquivos abertos diretamente
            )
            .AllowAnyMethod()               // Permitir todos os métodos HTTP
            .AllowAnyHeader()               // Permitir todos os headers
            .AllowCredentials();            // Permitir credenciais
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Usar CORS antes de outros middlewares
app.UseCors("AllowExtJS");

app.UseHttpsRedirection();

// Mapear controllers
app.MapControllers();

// Garantir que o banco de dados seja criado e populado com dados iniciais
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<PaisesDbContext>();
    
    // Criar o banco de dados se não existir
    context.Database.EnsureCreated();
    
    // Verificar se já existem dados
    if (!context.Paises.Any())
    {
        // Inicializar dados de exemplo
        SeedData.Initialize(context);
    }
}

Console.WriteLine("🚀 API de Países iniciada com sucesso!");
Console.WriteLine("📊 Banco de dados configurado com Entity Framework!");

app.Run();
