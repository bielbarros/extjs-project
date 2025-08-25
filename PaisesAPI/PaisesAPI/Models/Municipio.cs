namespace PaisesAPI.Models
{
    public class Municipio
    {
        public int Id { get; set; }
        public int PaisId { get; set; }
        public int UfId { get; set; }
        public string Nome { get; set; }
        public string CodigoIbge { get; set; }   // 7 digitos
        public int? CodigoSiafi { get; set; }
        public int? Ddd { get; set; }
        public string CepInicial { get; set; }   // 8 digitos (somente numeros)
        public string CepFinal { get; set; }     // 8 digitos (somente numeros)
        public string Timezone { get; set; }     // ex.: America/Sao_Paulo
        public decimal? Latitude { get; set; }
        public decimal? Longitude { get; set; }
        public string Observacao { get; set; }
        public bool Ativo { get; set; } = true;

        // Propriedades de navegação
        // Um Município pertence a um País (relacionamento N:1)
        public virtual Pais Pais { get; set; }
        
        // Um Município pertence a uma UF (relacionamento N:1)
        public virtual UF UF { get; set; }
    }
}
