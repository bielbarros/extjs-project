using Microsoft.EntityFrameworkCore;
using PaisesAPI.Models;

namespace PaisesAPI.Data
{
    /// <summary>
    /// Contexto do Entity Framework para gerenciar as entidades e conexão com o banco de dados
    /// </summary>
    public class PaisesDbContext : DbContext
    {
        public PaisesDbContext(DbContextOptions<PaisesDbContext> options) : base(options)
        {
        }

        // DbSets - representam as tabelas no banco de dados
        public DbSet<Pais> Paises { get; set; }
        public DbSet<UF> UFs { get; set; }
        public DbSet<Municipio> Municipios { get; set; }
        public DbSet<Pessoa> Pessoas { get; set; }

        /// <summary>
        /// Configuração das entidades e seus relacionamentos
        /// </summary>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuração da entidade Pais
            modelBuilder.Entity<Pais>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Sigla).IsRequired().HasMaxLength(2);
                entity.Property(e => e.CodigoBacen).IsRequired().HasMaxLength(3);
                
                // Índices para melhor performance
                entity.HasIndex(e => e.Sigla).IsUnique();
                entity.HasIndex(e => e.CodigoBacen).IsUnique();
            });

            // Configuração da entidade UF
            modelBuilder.Entity<UF>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Sigla).IsRequired().HasMaxLength(2);
                entity.Property(e => e.CodigoIbge).IsRequired().HasMaxLength(2);
                entity.Property(e => e.Regiao).HasMaxLength(50);
                entity.Property(e => e.Capital).HasMaxLength(100);

                // Relacionamento com Pais
                entity.HasOne(e => e.Pais)
                      .WithMany(e => e.UFs)
                      .HasForeignKey(e => e.PaisId)
                      .OnDelete(DeleteBehavior.Restrict);

                // Índices
                entity.HasIndex(e => new { e.PaisId, e.Sigla }).IsUnique();
                entity.HasIndex(e => e.CodigoIbge).IsUnique();
            });

            // Configuração da entidade Municipio
            modelBuilder.Entity<Municipio>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Nome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.CodigoIbge).IsRequired().HasMaxLength(7);
                entity.Property(e => e.CepInicial).HasMaxLength(8);
                entity.Property(e => e.CepFinal).HasMaxLength(8);
                entity.Property(e => e.Timezone).HasMaxLength(50);
                entity.Property(e => e.Observacao).HasMaxLength(500);

                // Relacionamentos
                entity.HasOne(e => e.Pais)
                      .WithMany()
                      .HasForeignKey(e => e.PaisId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.UF)
                      .WithMany(e => e.Municipios)
                      .HasForeignKey(e => e.UfId)
                      .OnDelete(DeleteBehavior.Restrict);

                // Índices
                entity.HasIndex(e => e.CodigoIbge).IsUnique();
                entity.HasIndex(e => new { e.UfId, e.Nome });
            });

            // Configuração da entidade Pessoa
            modelBuilder.Entity<Pessoa>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.PrimeiroNome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Sobrenome).IsRequired().HasMaxLength(100);
                entity.Property(e => e.Cpf).IsRequired().HasMaxLength(11);
                entity.Property(e => e.Rg).HasMaxLength(20);
                entity.Property(e => e.Nacionalidade).HasMaxLength(50);
                entity.Property(e => e.Email).HasMaxLength(100);
                entity.Property(e => e.Telefone).HasMaxLength(20);
                entity.Property(e => e.Celular).HasMaxLength(20);
                entity.Property(e => e.EndMunicipio).HasMaxLength(100);
                entity.Property(e => e.EndCep).HasMaxLength(8);
                entity.Property(e => e.EndLogradouro).HasMaxLength(200);
                entity.Property(e => e.EndNumero).HasMaxLength(10);
                entity.Property(e => e.EndBairro).HasMaxLength(100);
                entity.Property(e => e.EndComplemento).HasMaxLength(100);
                entity.Property(e => e.EndReferencia).HasMaxLength(200);

                // Relacionamentos de endereço (opcionais)
                entity.HasOne(e => e.EndPais)
                      .WithMany(e => e.Pessoas)
                      .HasForeignKey(e => e.EndPaisId)
                      .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(e => e.EndUF)
                      .WithMany(e => e.Pessoas)
                      .HasForeignKey(e => e.EndUfId)
                      .OnDelete(DeleteBehavior.Restrict);

                // Índices
                entity.HasIndex(e => e.Cpf).IsUnique();
                entity.HasIndex(e => e.Email);
            });
        }
    }
}
