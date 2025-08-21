namespace PaisesAPI.Models
{
    public class Pais
    {
        public int Id { get; set; }
        public string Nome { get; set; }
        public string Sigla { get; set; }        // alpha-2 (ex.: BR)
        public string CodigoBacen { get; set; }  // 3 digitos (ex.: 076)
        public bool Ativo { get; set; } = true;
    }
}
