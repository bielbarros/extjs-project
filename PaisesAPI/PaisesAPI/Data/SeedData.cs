using PaisesAPI.Models;

namespace PaisesAPI.Data
{
    /// <summary>
    /// Classe responsável por popular o banco de dados com dados iniciais
    /// </summary>
    public static class SeedData
    {
        public static void Initialize(PaisesDbContext context)
        {
            // Verificar se já existem dados
            if (context.Paises.Any())
                return;

            // Criar Brasil
            var brasil = new Pais
            {
                Nome = "Brasil",
                Sigla = "BR",
                CodigoBacen = "076",
                Ativo = "Sim"
            };

            context.Paises.Add(brasil);
            context.SaveChanges();

            // Obter o ID do Brasil criado
            var brasilId = brasil.Id;

            // Criar UFs do Brasil
            var ufs = new List<UF>
            {
                new UF { PaisId = brasilId, Nome = "Acre", Sigla = "AC", CodigoIbge = "12", Regiao = "Norte", Capital = "Rio Branco", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Alagoas", Sigla = "AL", CodigoIbge = "27", Regiao = "Nordeste", Capital = "Maceió", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Amapá", Sigla = "AP", CodigoIbge = "16", Regiao = "Norte", Capital = "Macapá", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Amazonas", Sigla = "AM", CodigoIbge = "13", Regiao = "Norte", Capital = "Manaus", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Bahia", Sigla = "BA", CodigoIbge = "29", Regiao = "Nordeste", Capital = "Salvador", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Ceará", Sigla = "CE", CodigoIbge = "23", Regiao = "Nordeste", Capital = "Fortaleza", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Distrito Federal", Sigla = "DF", CodigoIbge = "53", Regiao = "Centro-Oeste", Capital = "Brasília", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Espírito Santo", Sigla = "ES", CodigoIbge = "32", Regiao = "Sudeste", Capital = "Vitória", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Goiás", Sigla = "GO", CodigoIbge = "52", Regiao = "Centro-Oeste", Capital = "Goiânia", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Maranhão", Sigla = "MA", CodigoIbge = "21", Regiao = "Nordeste", Capital = "São Luís", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Mato Grosso", Sigla = "MT", CodigoIbge = "51", Regiao = "Centro-Oeste", Capital = "Cuiabá", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Mato Grosso do Sul", Sigla = "MS", CodigoIbge = "50", Regiao = "Centro-Oeste", Capital = "Campo Grande", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Minas Gerais", Sigla = "MG", CodigoIbge = "31", Regiao = "Sudeste", Capital = "Belo Horizonte", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Pará", Sigla = "PA", CodigoIbge = "15", Regiao = "Norte", Capital = "Belém", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Paraíba", Sigla = "PB", CodigoIbge = "25", Regiao = "Nordeste", Capital = "João Pessoa", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Paraná", Sigla = "PR", CodigoIbge = "41", Regiao = "Sul", Capital = "Curitiba", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Pernambuco", Sigla = "PE", CodigoIbge = "26", Regiao = "Nordeste", Capital = "Recife", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Piauí", Sigla = "PI", CodigoIbge = "22", Regiao = "Nordeste", Capital = "Teresina", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Rio de Janeiro", Sigla = "RJ", CodigoIbge = "33", Regiao = "Sudeste", Capital = "Rio de Janeiro", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Rio Grande do Norte", Sigla = "RN", CodigoIbge = "24", Regiao = "Nordeste", Capital = "Natal", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Rio Grande do Sul", Sigla = "RS", CodigoIbge = "43", Regiao = "Sul", Capital = "Porto Alegre", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Rondônia", Sigla = "RO", CodigoIbge = "11", Regiao = "Norte", Capital = "Porto Velho", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Roraima", Sigla = "RR", CodigoIbge = "14", Regiao = "Norte", Capital = "Boa Vista", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Santa Catarina", Sigla = "SC", CodigoIbge = "42", Regiao = "Sul", Capital = "Florianópolis", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "São Paulo", Sigla = "SP", CodigoIbge = "35", Regiao = "Sudeste", Capital = "São Paulo", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Sergipe", Sigla = "SE", CodigoIbge = "28", Regiao = "Nordeste", Capital = "Aracaju", Ativo = "Sim" },
                new UF { PaisId = brasilId, Nome = "Tocantins", Sigla = "TO", CodigoIbge = "17", Regiao = "Norte", Capital = "Palmas", Ativo = "Sim" }
            };

            context.UFs.AddRange(ufs);
            context.SaveChanges();

            // Obter IDs das UFs para usar nos municípios
            var spUf = context.UFs.First(u => u.Sigla == "SP");
            var rjUf = context.UFs.First(u => u.Sigla == "RJ");
            var mgUf = context.UFs.First(u => u.Sigla == "MG");
            var prUf = context.UFs.First(u => u.Sigla == "PR");
            var rsUf = context.UFs.First(u => u.Sigla == "RS");

            // Criar alguns municípios de exemplo
            var municipios = new List<Municipio>
            {
                new Municipio { PaisId = brasilId, UfId = spUf.Id, Nome = "São Paulo", CodigoIbge = "3550308", CepInicial = "01000000", CepFinal = "09999999", Timezone = "America/Sao_Paulo", Ativo = "Sim" },
                new Municipio { PaisId = brasilId, UfId = rjUf.Id, Nome = "Rio de Janeiro", CodigoIbge = "3304557", CepInicial = "20000000", CepFinal = "29999999", Timezone = "America/Sao_Paulo", Ativo = "Sim" },
                new Municipio { PaisId = brasilId, UfId = mgUf.Id, Nome = "Belo Horizonte", CodigoIbge = "3106200", CepInicial = "30000000", CepFinal = "39999999", Timezone = "America/Sao_Paulo", Ativo = "Sim" },
                new Municipio { PaisId = brasilId, UfId = prUf.Id, Nome = "Curitiba", CodigoIbge = "4106902", CepInicial = "80000000", CepFinal = "89999999", Timezone = "America/Sao_Paulo", Ativo = "Sim" },
                new Municipio { PaisId = brasilId, UfId = rsUf.Id, Nome = "Porto Alegre", CodigoIbge = "4314902", CepInicial = "90000000", CepFinal = "99999999", Timezone = "America/Sao_Paulo", Ativo = "Sim" }
            };

            context.Municipios.AddRange(municipios);
            context.SaveChanges();

            // Criar algumas pessoas de exemplo
            var pessoas = new List<Pessoa>
            {
                new Pessoa
                {
                    PrimeiroNome = "João",
                    Sobrenome = "Silva",
                    Nascimento = new DateTime(1990, 5, 15),
                    Sexo = Sexo.Masculino,
                    EstadoCivil = EstadoCivil.Solteiro,
                    Cpf = "12345678901",
                    Rg = "123456789",
                    Nacionalidade = "Brasileira",
                    Email = "joao.silva@email.com",
                    Telefone = "(11) 1234-5678",
                    Celular = "(11) 98765-4321",
                    EndPaisId = brasilId,
                    EndUfId = spUf.Id,
                    EndMunicipio = "São Paulo",
                    EndCep = "01234-567",
                    EndLogradouro = "Rua das Flores",
                    EndNumero = "123",
                    EndBairro = "Centro",
                    Ativo = "Sim"
                },
                new Pessoa
                {
                    PrimeiroNome = "Maria",
                    Sobrenome = "Santos",
                    Nascimento = new DateTime(1985, 8, 20),
                    Sexo = Sexo.Feminino,
                    EstadoCivil = EstadoCivil.Casado,
                    Cpf = "98765432109",
                    Rg = "987654321",
                    Nacionalidade = "Brasileira",
                    Email = "maria.santos@email.com",
                    Telefone = "(21) 9876-5432",
                    Celular = "(21) 12345-6789",
                    EndPaisId = brasilId,
                    EndUfId = rjUf.Id,
                    EndMunicipio = "Rio de Janeiro",
                    EndCep = "20000-000",
                    EndLogradouro = "Avenida Copacabana",
                    EndNumero = "456",
                    EndBairro = "Copacabana",
                    Ativo = "Sim"
                }
            };

            context.Pessoas.AddRange(pessoas);
            context.SaveChanges();

            Console.WriteLine("Dados iniciais carregados com sucesso!");
            Console.WriteLine($"   - Países: {context.Paises.Count()}");
            Console.WriteLine($"   - UFs: {context.UFs.Count()}");
            Console.WriteLine($"   - Municípios: {context.Municipios.Count()}");
            Console.WriteLine($"   - Pessoas: {context.Pessoas.Count()}");
        }
    }
}
