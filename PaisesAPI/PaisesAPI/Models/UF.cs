namespace PaisesAPI.Models
{
    public class UF
    {
        public int Id { get; set; }
        public int PaisId { get; set; }
        public string Nome { get; set; }
        public string Sigla { get; set; }        // 2 letras
        public string CodigoIbge { get; set; }   // 2 digitos
        public string Regiao { get; set; }       // Norte, Nordeste, Centro-Oeste, Sudeste, Sul
        public string Capital { get; set; }
        public bool Ativo { get; set; } = true;

        // Propriedades de navegação
        // Uma UF pertence a um País (relacionamento N:1)
        public virtual Pais Pais { get; set; }
        
        // Uma UF pode ter vários Municípios (relacionamento 1:N)
        public virtual ICollection<Municipio> Municipios { get; set; } = new List<Municipio>();
        
        // Uma UF pode ter várias Pessoas (relacionamento 1:N)
        public virtual ICollection<Pessoa> Pessoas { get; set; } = new List<Pessoa>();
    }
}
