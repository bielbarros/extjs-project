using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaisesAPI.Data;
using PaisesAPI.Models;

namespace PaisesAPI.Services
{
    public class PessoaService : IPessoaService
    {
        private readonly PaisesDbContext _context;

        public PessoaService(PaisesDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Pessoa>>> ListarPessoasAsync()
        {
            return await _context.Pessoas
                .Include(p => p.EndPais)
                .Include(p => p.EndUF)
                .ToListAsync();
        }

        public async Task<ActionResult<Pessoa>> BuscarPessoaPorIdAsync(int id)
        {
            var pessoa = await _context.Pessoas
                .Include(p => p.EndPais)
                .Include(p => p.EndUF)
                .FirstOrDefaultAsync(p => p.Id == id);
            
            if (pessoa == null)
            {
                return new NotFoundObjectResult($"Pessoa com ID {id} não encontrada.");
            }
            return new OkObjectResult(pessoa);
        }

        public async Task<ActionResult<Pessoa>> CriarPessoaAsync(Pessoa pessoa)
        {
            if (pessoa == null)
            {
                return new BadRequestObjectResult("Dados da pessoa não podem ser nulos.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(pessoa.PrimeiroNome))
            {
                return new BadRequestObjectResult("Primeiro nome é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pessoa.Sobrenome))
            {
                return new BadRequestObjectResult("Sobrenome é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pessoa.Cpf))
            {
                return new BadRequestObjectResult("CPF é obrigatório.");
            }

            // Verificar se já existe pessoa com mesmo CPF
            if (await _context.Pessoas.AnyAsync(p => p.Cpf == pessoa.Cpf))
            {
                return new BadRequestObjectResult($"Já existe uma pessoa com o CPF {pessoa.Cpf}.");
            }

            // Verificar se o país de endereço existe (se fornecido)
            if (pessoa.EndPaisId.HasValue)
            {
                var pais = await _context.Paises.FindAsync(pessoa.EndPaisId.Value);
                if (pais == null)
                {
                    return new BadRequestObjectResult("País de endereço não encontrado.");
                }
            }

            // Verificar se a UF de endereço existe (se fornecida)
            if (pessoa.EndUfId.HasValue)
            {
                var uf = await _context.UFs.FindAsync(pessoa.EndUfId.Value);
                if (uf == null)
                {
                    return new BadRequestObjectResult("UF de endereço não encontrada.");
                }

                // Verificar se a UF pertence ao país (se ambos foram fornecidos)
                if (pessoa.EndPaisId.HasValue && uf.PaisId != pessoa.EndPaisId.Value)
                {
                    return new BadRequestObjectResult("A UF não pertence ao país selecionado.");
                }
            }

            _context.Pessoas.Add(pessoa);
            await _context.SaveChangesAsync();

            return new CreatedAtActionResult("Get", "Pessoas", new { id = pessoa.Id }, pessoa);
        }

        public async Task<ActionResult> AtualizarPessoaAsync(int id, Pessoa pessoa)
        {
            if (pessoa == null)
            {
                return new BadRequestObjectResult("Dados da pessoa não podem ser nulos.");
            }

            pessoa.Id = id;

            var pessoaExistente = await _context.Pessoas.FindAsync(id);
            if (pessoaExistente == null)
            {
                return new NotFoundObjectResult($"Pessoa com ID {id} não encontrada.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(pessoa.PrimeiroNome))
            {
                return new BadRequestObjectResult("Primeiro nome é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pessoa.Sobrenome))
            {
                return new BadRequestObjectResult("Sobrenome é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pessoa.Cpf))
            {
                return new BadRequestObjectResult("CPF é obrigatório.");
            }

            // Verificar se já existe outra pessoa com mesmo CPF (exceto a atual)
            if (await _context.Pessoas.AnyAsync(p => p.Id != id && p.Cpf == pessoa.Cpf))
            {
                return new BadRequestObjectResult($"Já existe outra pessoa com o CPF {pessoa.Cpf}.");
            }

            // Verificar se o país de endereço existe (se fornecido)
            if (pessoa.EndPaisId.HasValue)
            {
                var pais = await _context.Paises.FindAsync(pessoa.EndPaisId.Value);
                if (pais == null)
                {
                    return new BadRequestObjectResult("País de endereço não encontrado.");
                }
            }

            // Verificar se a UF de endereço existe (se fornecida)
            if (pessoa.EndUfId.HasValue)
            {
                var uf = await _context.UFs.FindAsync(pessoa.EndUfId.Value);
                if (uf == null)
                {
                    return new BadRequestObjectResult("UF de endereço não encontrada.");
                }

                // Verificar se a UF pertence ao país (se ambos foram fornecidos)
                if (pessoa.EndPaisId.HasValue && uf.PaisId != pessoa.EndPaisId.Value)
                {
                    return new BadRequestObjectResult("A UF não pertence ao país selecionado.");
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

                return new NoContentResult();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await PessoaExisteAsync(id))
                {
                    return new NotFoundObjectResult($"Pessoa com ID {id} não encontrada.");
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult> ExcluirPessoaAsync(int id)
        {
            var pessoaExistente = await _context.Pessoas.FindAsync(id);
            if (pessoaExistente == null)
            {
                return new NotFoundObjectResult($"Pessoa com ID {id} não encontrada.");
            }

            try
            {
                _context.Pessoas.Remove(pessoaExistente);
                await _context.SaveChangesAsync();

                return new NoContentResult();
            }
            catch (DbUpdateException)
            {
                return new BadRequestObjectResult("Não é possível excluir a pessoa pois existem registros relacionados.");
            }
        }

        public async Task<ActionResult<IEnumerable<Pessoa>>> BuscarPessoasPorTermoAsync(string termo)
        {
            if (string.IsNullOrWhiteSpace(termo))
            {
                return await _context.Pessoas
                    .Include(p => p.EndPais)
                    .Include(p => p.EndUF)
                    .ToListAsync();
            }

            var termoLower = termo.ToLower();
            var pessoasEncontradas = await _context.Pessoas
                .Include(p => p.EndPais)
                .Include(p => p.EndUF)
                .Where(p => p.PrimeiroNome.ToLower().Contains(termoLower) ||
                           p.Sobrenome.ToLower().Contains(termoLower) ||
                           p.Cpf.Contains(termoLower) ||
                           p.Email.ToLower().Contains(termoLower))
                .ToListAsync();

            return new OkObjectResult(pessoasEncontradas);
        }

        public async Task<ActionResult<IEnumerable<Pessoa>>> ListarPessoasAtivasAsync()
        {
            var pessoasAtivas = await _context.Pessoas
                .Where(p => p.Ativo == "Sim")
                .Include(p => p.EndPais)
                .Include(p => p.EndUF)
                .ToListAsync();
            return new OkObjectResult(pessoasAtivas);
        }

        public async Task<ActionResult<Pessoa>> BuscarPessoaPorCPFAsync(string cpf)
        {
            var pessoa = await _context.Pessoas
                .Include(p => p.EndPais)
                .Include(p => p.EndUF)
                .FirstOrDefaultAsync(p => p.Cpf == cpf);
            
            if (pessoa == null)
            {
                return new NotFoundObjectResult($"Pessoa com CPF {cpf} não encontrada.");
            }
            return new OkObjectResult(pessoa);
        }

        public async Task<bool> PessoaExisteAsync(int id)
        {
            return await _context.Pessoas.AnyAsync(e => e.Id == id);
        }
    }
}
