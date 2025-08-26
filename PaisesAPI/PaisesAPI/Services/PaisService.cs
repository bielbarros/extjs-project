using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaisesAPI.Data;
using PaisesAPI.Models;

namespace PaisesAPI.Services
{
    public class PaisService : IPaisService
    {
        private readonly PaisesDbContext _context;

        public PaisService(PaisesDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Pais>>> ListarPaisesAsync()
        {
            return await _context.Paises.ToListAsync();
        }

        public async Task<ActionResult<Pais>> BuscarPaisPorIdAsync(int id)
        {
            var pais = await _context.Paises.FindAsync(id);
            if (pais == null)
            {
                return new NotFoundObjectResult($"País com ID {id} não encontrado.");
            }
            return new OkObjectResult(pais);
        }

        public async Task<ActionResult<Pais>> CriarPaisAsync(Pais pais)
        {
            Console.WriteLine($"POST recebido: Nome={pais?.Nome}, Sigla={pais?.Sigla}, CodigoBacen={pais?.CodigoBacen}, Ativo={pais?.Ativo}");
            
            if (pais == null)
            {
                return new BadRequestObjectResult("Dados do país não podem ser nulos.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(pais.Nome))
            {
                return new BadRequestObjectResult("Nome do país é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pais.Sigla))
            {
                return new BadRequestObjectResult("Sigla do país é obrigatória.");
            }

            if (string.IsNullOrWhiteSpace(pais.CodigoBacen))
            {
                return new BadRequestObjectResult("Código BACEN é obrigatório.");
            }

            // Verificar se já existe país com mesma sigla
            if (await _context.Paises.AnyAsync(p => p.Sigla.ToUpper() == pais.Sigla.ToUpper()))
            {
                return new BadRequestObjectResult($"Já existe um país com a sigla {pais.Sigla}.");
            }

            // Verificar se já existe país com mesmo código BACEN
            if (await _context.Paises.AnyAsync(p => p.CodigoBacen == pais.CodigoBacen))
            {
                return new BadRequestObjectResult($"Já existe um país com o código BACEN {pais.CodigoBacen}.");
            }

            _context.Paises.Add(pais);
            await _context.SaveChangesAsync();

            return new CreatedAtActionResult("Get", "Paises", new { id = pais.Id }, pais);
        }

        public async Task<ActionResult> AtualizarPaisAsync(int id, Pais pais)
        {
            if (pais == null)
            {
                return new BadRequestObjectResult("Dados do país não podem ser nulos.");
            }

            // Definir o ID do país com base no parâmetro da URL
            pais.Id = id;

            // Verificar se o país existe
            var paisExistente = await _context.Paises.FindAsync(id);
            if (paisExistente == null)
            {
                return new NotFoundObjectResult($"País com ID {id} não encontrado.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(pais.Nome))
            {
                return new BadRequestObjectResult("Nome do país é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pais.Sigla))
            {
                return new BadRequestObjectResult("Sigla do país é obrigatória.");
            }

            if (string.IsNullOrWhiteSpace(pais.CodigoBacen))
            {
                return new BadRequestObjectResult("Código BACEN é obrigatório.");
            }

            // Verificar se já existe outro país com mesma sigla (excluindo o atual)
            if (await _context.Paises.AnyAsync(p => p.Sigla.ToUpper() == pais.Sigla.ToUpper() && p.Id != id))
            {
                return new BadRequestObjectResult($"Já existe um país com a sigla {pais.Sigla}.");
            }

            // Verificar se já existe outro país com mesmo código BACEN (excluindo o atual)
            if (await _context.Paises.AnyAsync(p => p.CodigoBacen == pais.CodigoBacen && p.Id != id))
            {
                return new BadRequestObjectResult($"Já existe um país com o código BACEN {pais.CodigoBacen}.");
            }

            // Atualizar propriedades
            paisExistente.Nome = pais.Nome;
            paisExistente.Sigla = pais.Sigla;
            paisExistente.CodigoBacen = pais.CodigoBacen;
            paisExistente.Ativo = pais.Ativo;

            await _context.SaveChangesAsync();

            return new NoContentResult();
        }

        public async Task<ActionResult> ExcluirPaisAsync(int id)
        {
            var pais = await _context.Paises.FindAsync(id);
            if (pais == null)
            {
                return new NotFoundObjectResult($"País com ID {id} não encontrado.");
            }

            // Verificar se existem UFs associadas
            if (await _context.UFs.AnyAsync(uf => uf.PaisId == id))
            {
                return new BadRequestObjectResult("Não é possível excluir um país que possui UFs associadas.");
            }

            _context.Paises.Remove(pais);
            await _context.SaveChangesAsync();

            return new NoContentResult();
        }

        public async Task<ActionResult<IEnumerable<Pais>>> BuscarPaisesPorTermoAsync(string termo)
        {
            if (string.IsNullOrWhiteSpace(termo))
            {
                return await _context.Paises.ToListAsync(); // Retorna todos se não houver termo
            }

            var termoLower = termo.ToLower();
            var paisesEncontrados = await _context.Paises
                .Where(p => p.Nome.ToLower().Contains(termoLower) ||
                           p.Sigla.ToLower().Contains(termoLower) ||
                           p.CodigoBacen.Contains(termoLower))
                .ToListAsync();

            return new OkObjectResult(paisesEncontrados);
        }

        public async Task<ActionResult<IEnumerable<Pais>>> ListarPaisesAtivosAsync()
        {
            var paisesAtivos = await _context.Paises.Where(p => p.Ativo == "Sim").ToListAsync();
            return new OkObjectResult(paisesAtivos);
        }

        public async Task<bool> PaisExisteAsync(int id)
        {
            return await _context.Paises.AnyAsync(e => e.Id == id);
        }
    }
}
