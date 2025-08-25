namespace PaisesAPI.Models
{
    public class Pessoa
    {
        public int Id { get; set; }
        public string PrimeiroNome { get; set; }
        public string Sobrenome { get; set; }
        public DateTime? Nascimento { get; set; }
        public Sexo? Sexo { get; set; }
        public EstadoCivil? EstadoCivil { get; set; }

        public string Cpf { get; set; }          // 11 digitos
        public string Rg { get; set; }
        public string Nacionalidade { get; set; }

        public string Email { get; set; }
        public string Telefone { get; set; }
        public string Celular { get; set; }

        // Endereco
        public int? EndPaisId { get; set; }
        public int? EndUfId { get; set; }
        public string EndMunicipio { get; set; }
        public string EndCep { get; set; }       // 8 digitos
        public string EndLogradouro { get; set; }
        public string EndNumero { get; set; }
        public string EndBairro { get; set; }
        public string EndComplemento { get; set; }
        public string EndReferencia { get; set; }
        public decimal? EndLatitude { get; set; }
        public decimal? EndLongitude { get; set; }

        public bool Ativo { get; set; } = true;

        // Propriedades de navegação
        // Uma Pessoa pode ter um País de endereço (relacionamento N:1)
        public virtual Pais? EndPais { get; set; }
        
        // Uma Pessoa pode ter uma UF de endereço (relacionamento N:1)
        public virtual UF? EndUF { get; set; }
    }
}
