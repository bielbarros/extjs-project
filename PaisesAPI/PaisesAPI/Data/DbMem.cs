using PaisesAPI.Models;

namespace PaisesAPI.Data
{
    // Repositorio em memoria simples (sem thread-safety, por enquanto)
    public static class DbMem
    {
        private static int _seqPais = 1;
        private static int _seqUf = 1;
        private static int _seqMunicipio = 1;
        private static int _seqPessoa = 1;

        public static readonly List<Pais> Paises = new List<Pais>();
        public static readonly List<UF> UFs = new List<UF>();
        public static readonly List<Municipio> Municipios = new List<Municipio>();
        public static readonly List<Pessoa> Pessoas = new List<Pessoa>();

        #region CRUD Pais
        public static Pais AddPais(Pais p)
        {
            p.Id = _seqPais++;
            Paises.Add(p);
            return p;
        }
        public static Pais GetPais(int id) => Paises.FirstOrDefault(x => x.Id == id);
        public static IEnumerable<Pais> FindPaises(Func<Pais, bool> pred) => Paises.Where(pred);
        public static bool UpdatePais(int id, Action<Pais> update)
        {
            var p = GetPais(id); if (p == null) return false; update(p); return true;
        }
        public static bool RemovePais(int id)
        {
            var p = GetPais(id); if (p == null) return false;
            // opcional: remover dependencias
            UFs.RemoveAll(u => u.PaisId == id);
            Municipios.RemoveAll(m => m.PaisId == id);
            return Paises.Remove(p);
        }
        #endregion

        #region CRUD UF
        public static UF AddUF(UF u)
        {
            u.Id = _seqUf++;
            UFs.Add(u);
            return u;
        }
        public static UF GetUF(int id) => UFs.FirstOrDefault(x => x.Id == id);
        public static IEnumerable<UF> GetUFsByPais(int paisId) => UFs.Where(x => x.PaisId == paisId);
        public static bool UpdateUF(int id, Action<UF> update)
        {
            var u = GetUF(id); if (u == null) return false; update(u); return true;
        }
        public static bool RemoveUF(int id)
        {
            var u = GetUF(id); if (u == null) return false;
            Municipios.RemoveAll(m => m.UfId == id);
            return UFs.Remove(u);
        }
        #endregion

        #region CRUD Municipio
        public static Municipio AddMunicipio(Municipio m)
        {
            m.Id = _seqMunicipio++;
            Municipios.Add(m);
            return m;
        }
        public static Municipio GetMunicipio(int id) => Municipios.FirstOrDefault(x => x.Id == id);
        public static IEnumerable<Municipio> GetMunicipiosByUF(int ufId) => Municipios.Where(x => x.UfId == ufId);
        public static bool UpdateMunicipio(int id, Action<Municipio> update)
        {
            var m = GetMunicipio(id); if (m == null) return false; update(m); return true;
        }
        public static bool RemoveMunicipio(int id)
        {
            var m = GetMunicipio(id); if (m == null) return false;
            return Municipios.Remove(m);
        }
        #endregion

        #region CRUD Pessoa
        public static Pessoa AddPessoa(Pessoa p)
        {
            p.Id = _seqPessoa++;
            Pessoas.Add(p);
            return p;
        }
        public static Pessoa GetPessoa(int id) => Pessoas.FirstOrDefault(x => x.Id == id);
        public static IEnumerable<Pessoa> FindPessoas(Func<Pessoa, bool> pred) => Pessoas.Where(pred);
        public static bool UpdatePessoa(int id, Action<Pessoa> update)
        {
            var p = GetPessoa(id); if (p == null) return false; update(p); return true;
        }
        public static bool RemovePessoa(int id)
        {
            var p = GetPessoa(id); if (p == null) return false;
            return Pessoas.Remove(p);
        }
        #endregion

        // Seed opcional com dados basicos
        public static void SeedBrasilBasico()
        {
            if (Paises.Any()) return; // ja populado

            var br = AddPais(new Pais { Nome = "Brasil", Sigla = "BR", CodigoBacen = "076" });
            var us = AddPais(new Pais { Nome = "United States", Sigla = "US", CodigoBacen = "840" });
            var ar = AddPais(new Pais { Nome = "Argentina", Sigla = "AR", CodigoBacen = "032" });

            var sp = AddUF(new UF { PaisId = br.Id, Nome = "Sao Paulo", Sigla = "SP", CodigoIbge = "35", Regiao = "Sudeste", Capital = "Sao Paulo" });
            var rj = AddUF(new UF { PaisId = br.Id, Nome = "Rio de Janeiro", Sigla = "RJ", CodigoIbge = "33", Regiao = "Sudeste", Capital = "Rio de Janeiro" });

            AddMunicipio(new Municipio { PaisId = br.Id, UfId = sp.Id, Nome = "Sao Paulo", CodigoIbge = "3550308", Ddd = 11, Timezone = "America/Sao_Paulo" });
            AddMunicipio(new Municipio { PaisId = br.Id, UfId = rj.Id, Nome = "Rio de Janeiro", CodigoIbge = "3304557", Ddd = 21, Timezone = "America/Sao_Paulo" });

            AddPessoa(new Pessoa {
                PrimeiroNome = "Joao",
                Sobrenome = "Silva",
                Sexo = Sexo.Masculino,
                EstadoCivil = EstadoCivil.Solteiro,
                Cpf = "12345678901",
                Email = "joao@example.com",
                EndPaisId = br.Id,
                EndUfId = sp.Id,
                EndMunicipio = "Sao Paulo",
                EndCep = "01001000",
                EndLogradouro = "Av. Paulista",
                EndNumero = "1000",
                EndBairro = "Bela Vista",
                Ativo = true
            });
        }

        public static void Reset()
        {
            Paises.Clear(); UFs.Clear(); Municipios.Clear(); Pessoas.Clear();
            _seqPais = _seqUf = _seqMunicipio = _seqPessoa = 1;
        }
    }
}
