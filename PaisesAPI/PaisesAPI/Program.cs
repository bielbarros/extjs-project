using PaisesAPI.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(options => 
{
    options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true;
}); // Adicionar suporte a controllers
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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

// Inicializar dados de exemplo
DbMem.SeedBrasilBasico();

Console.WriteLine("🚀 API de Países iniciada com sucesso!");
Console.WriteLine("📊 Dados iniciais carregados:");
Console.WriteLine($"   - Países: {DbMem.Paises.Count}");
Console.WriteLine($"   - UFs: {DbMem.UFs.Count}");
Console.WriteLine($"   - Municípios: {DbMem.Municipios.Count}");
Console.WriteLine($"   - Pessoas: {DbMem.Pessoas.Count}");

app.Run();
