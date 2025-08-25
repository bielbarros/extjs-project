using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaisesAPI.Data;
using PaisesAPI.Models;

namespace PaisesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly PaisesDbContext _context;

        public PessoasController(PaisesDbContext context)
        {
            _context = context;
        }

        // GET: api/pessoas - Listar todas as pessoas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> Get()
        {
            return await _context.Pessoas
                .Include(p => p.EndPais)
                .Include(p => p.EndUF)
                .ToListAsync();
        }

        // GET: api/pessoas/{id} - Buscar pessoa por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> Get(int id)
        {
            var pessoa = await _context.Pessoas
                .Include(p => p.EndPais)
                .Include(p => p.EndUF)
                .FirstOrDefaultAsync(p => p.Id == id);
            
            if (pessoa == null)
            {
                return NotFound($"Pessoa com ID {id} não encontrada.");
            }
            return Ok(pessoa);
        }

        // POST: api/pessoas - Criar nova pessoa
        [HttpPost]
        public async Task<ActionResult<Pessoa>> Post([FromBody] Pessoa pessoa)
        {
            if (pessoa == null)
            {
                return BadRequest("Dados da pessoa não podem ser nulos.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(pessoa.PrimeiroNome))
            {
                return BadRequest("Primeiro nome é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pessoa.Sobrenome))
            {
                return BadRequest("Sobrenome é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pessoa.Cpf))
            {
                return BadRequest("CPF é obrigatório.");
            }

            // Verificar se já existe pessoa com mesmo CPF
            if (await _context.Pessoas.AnyAsync(p => p.Cpf == pessoa.Cpf))
            {
                return BadRequest($"Já existe uma pessoa com o CPF {pessoa.Cpf}.");
            }

            // Verificar se o país de endereço existe (se fornecido)
            if (pessoa.EndPaisId.HasValue)
            {
                var pais = await _context.Paises.FindAsync(pessoa.EndPaisId.Value);
                if (pais == null)
                {
                    return BadRequest("País de endereço não encontrado.");
                }
            }

            // Verificar se a UF de endereço existe (se fornecida)
            if (pessoa.EndUfId.HasValue)
            {
                var uf = await _context.UFs.FindAsync(pessoa.EndUfId.Value);
                if (uf == null)
                {
                    return BadRequest("UF de endereço não encontrada.");
                }

                // Verificar se a UF pertence ao país (se ambos foram fornecidos)
                if (pessoa.EndPaisId.HasValue && uf.PaisId != pessoa.EndPaisId.Value)
                {
                    return BadRequest("A UF não pertence ao país selecionado.");
                }
            }

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = pessoa.Id }, pessoa);
        }

        // PUT: api/pessoas/{id} - Atualizar pessoa existente
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Pessoa pessoa)
        {
            if (pessoa == null)
            {
                return BadRequest("Dados da pessoa não podem ser nulos.");
            }

            pessoa.Id = id;

            var pessoaExistente = await _context.Pessoas.FindAsync(id);
            if (pessoaExistente == null)
            {
                return NotFound($"Pessoa com ID {id} não encontrada.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(pessoa.PrimeiroNome))
            {
                return BadRequest("Primeiro nome é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pessoa.Sobrenome))
            {
                return BadRequest("Sobrenome é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pessoa.Cpf))
            {
                return BadRequest("CPF é obrigatório.");
            }

            // Verificar se já existe outra pessoa com mesmo CPF (exceto a atual)
            if (await _context.Pessoas.AnyAsync(p => p.Id != id && p.Cpf == pessoa.Cpf))
            {
                return BadRequest($"Já existe outra pessoa com o CPF {pessoa.Cpf}.");
            }

            // Verificar se o país de endereço existe (se fornecido)
            if (pessoa.EndPaisId.HasValue)
            {
                var pais = await _context.Paises.FindAsync(pessoa.EndPaisId.Value);
                if (pais == null)
                {
                    return BadRequest("País de endereço não encontrado.");
                }
            }

            // Verificar se a UF de endereço existe (se fornecida)
            if (pessoa.EndUfId.HasValue)
            {
                var uf = await _context.UFs.FindAsync(pessoa.EndUfId.Value);
                if (uf == null)
                {
                    return BadRequest("UF de endereço não encontrada.");
                }

                // Verificar se a UF pertence ao país (se ambos foram fornecidos)
                if (pessoa.EndPaisId.HasValue && uf.PaisId != pessoa.EndPaisId.Value)
                {
                    return BadRequest("A UF não pertence ao país selecionado.");
                }
            }

            try
            {
                pessoaExistente.PrimeiroNome = pessoa.PrimeiroNome;
                pessoaExistente.Sobrenome = pessoa.Sobrenome;
                pessoaExistente.Nascimento = pessoa.Nascimento;
                pessoaExistente.Sexo = pessoa.Sexo;
                pessoaExistente.EstadoCivil = pessoa.EstadoCivil;
                pessoaExistente.Cpf = pessoa.Cpf;
                pessoaExistente.Rg = pessoa.Rg;
                pessoaExistente.Nacionalidade = pessoa.Nacionalidade;
                pessoaExistente.Email = pessoa.Email;
                pessoaExistente.Telefone = pessoa.Telefone;
                pessoaExistente.Celular = pessoa.Celular;
                pessoaExistente.EndPaisId = pessoa.EndPaisId;
                pessoaExistente.EndUfId = pessoa.EndUfId;
                pessoaExistente.EndMunicipio = pessoa.EndMunicipio;
                pessoaExistente.EndCep = pessoa.EndCep;
                pessoaExistente.EndLogradouro = pessoa.EndLogradouro;
                pessoaExistente.EndNumero = pessoa.EndNumero;
                pessoaExistente.EndBairro = pessoa.EndBairro;
                pessoaExistente.EndComplemento = pessoa.EndComplemento;
                pessoaExistente.EndReferencia = pessoa.EndReferencia;
                pessoaExistente.EndLatitude = pessoa.EndLatitude;
                pessoaExistente.EndLongitude = pessoa.EndLongitude;
                pessoaExistente.Ativo = pessoa.Ativo;

                _context.Pessoas.Update(pessoaExistente);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await PessoaExists(id))
                {
                    return NotFound($"Pessoa com ID {id} não encontrada.");
                }
                else
                {
                    throw;
                }
            }
        }

        // DELETE: api/pessoas/{id} - Remover pessoa
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var pessoaExistente = await _context.Pessoas.FindAsync(id);
            if (pessoaExistente == null)
            {
                return NotFound($"Pessoa com ID {id} não encontrada.");
            }

            try
            {
                _context.Pessoas.Remove(pessoaExistente);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateException)
            {
                return BadRequest("Não é possível excluir a pessoa pois existem registros relacionados.");
            }
        }

        // GET: api/pessoas/ativos - Listar apenas pessoas ativas
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAtivos()
        {
            var pessoasAtivas = await _context.Pessoas
                .Where(p => p.Ativo == "Sim")
                .Include(p => p.EndPais)
                .Include(p => p.EndUF)
                .ToListAsync();
            return Ok(pessoasAtivas);
        }

        // GET: api/pessoas/cpf/{cpf} - Buscar pessoa por CPF
        [HttpGet("cpf/{cpf}")]
        public async Task<ActionResult<Pessoa>> GetByCpf(string cpf)
        {
            var pessoa = await _context.Pessoas
                .Include(p => p.EndPais)
                .Include(p => p.EndUF)
                .FirstOrDefaultAsync(p => p.Cpf == cpf);
            
            if (pessoa == null)
            {
                return NotFound($"Pessoa com CPF {cpf} não encontrada.");
            }
            return Ok(pessoa);
        }

        private async Task<bool> PessoaExists(int id)
        {
            return await _context.Pessoas.AnyAsync(e => e.Id == id);
        }
    }
}
