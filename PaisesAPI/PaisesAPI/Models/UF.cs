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
    }
}
