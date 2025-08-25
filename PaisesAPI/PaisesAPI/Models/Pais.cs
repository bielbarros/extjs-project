namespace PaisesAPI.Models
{
    public class Pais
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sigla { get; set; }        // alpha-2 (ex.: BR)
        public string CodigoBacen { get; set; }  // 3 digitos (ex.: 076)
        public string Ativo { get; set; } = "Sim"; // Sim = Ativo, Não = Inativo

        // Propriedades de navegação - definem os relacionamentos
        // Um País pode ter várias UFs (relacionamento 1:N)
        public virtual ICollection<UF> UFs { get; set; } = new List<UF>();
        
        // Um País pode ter várias Pessoas (relacionamento 1:N)
        public virtual ICollection<Pessoa> Pessoas { get; set; } = new List<Pessoa>();
    }
}
