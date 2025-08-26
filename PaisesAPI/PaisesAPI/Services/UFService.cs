using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaisesAPI.Data;
using PaisesAPI.Models;

namespace PaisesAPI.Services
{
    public class UFService : IUFService
    {
        private readonly PaisesDbContext _context;

        public UFService(PaisesDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<UF>>> ListarUFsAsync()
        {
            return await _context.UFs.Include(u => u.Pais).ToListAsync();
        }

        public async Task<ActionResult<UF>> BuscarUFPorIdAsync(int id)
        {
            var uf = await _context.UFs.Include(u => u.Pais).FirstOrDefaultAsync(u => u.Id == id);
            if (uf == null)
            {
                return new NotFoundObjectResult($"UF com ID {id} não encontrada.");
            }
            return new OkObjectResult(uf);
        }

        public async Task<ActionResult<UF>> CriarUFAsync(UF uf)
        {
            if (uf == null)
            {
                return new BadRequestObjectResult("Dados da UF não podem ser nulos.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(uf.Nome))
            {
                return new BadRequestObjectResult("Nome da UF é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(uf.Sigla))
            {
                return new BadRequestObjectResult("Sigla da UF é obrigatória.");
            }

            if (string.IsNullOrWhiteSpace(uf.CodigoIbge))
            {
                return new BadRequestObjectResult("Código IBGE é obrigatório.");
            }

            // Verificar se o país existe
            var pais = await _context.Paises.FindAsync(uf.PaisId);
            if (pais == null)
            {
                return new BadRequestObjectResult("País não encontrado.");
            }

            // Verificar se já existe UF com mesma sigla no mesmo país
            if (await _context.UFs.AnyAsync(u => u.PaisId == uf.PaisId && u.Sigla.ToUpper() == uf.Sigla.ToUpper()))
            {
                return new BadRequestObjectResult($"Já existe uma UF com a sigla {uf.Sigla} neste país.");
            }

            // Verificar se já existe UF com mesmo código IBGE
            if (await _context.UFs.AnyAsync(u => u.CodigoIbge == uf.CodigoIbge))
            {
                return new BadRequestObjectResult($"Já existe uma UF com o código IBGE {uf.CodigoIbge}.");
            }

            _context.UFs.Add(uf);
            await _context.SaveChangesAsync();

            return new CreatedAtActionResult("Get", "UFs", new { id = uf.Id }, uf);
        }

        public async Task<ActionResult> AtualizarUFAsync(int id, UF uf)
        {
            if (uf == null)
            {
                return new BadRequestObjectResult("Dados da UF não podem ser nulos.");
            }

            uf.Id = id;

            var ufExistente = await _context.UFs.FindAsync(id);
            if (ufExistente == null)
            {
                return new NotFoundObjectResult($"UF com ID {id} não encontrada.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(uf.Nome))
            {
                return new BadRequestObjectResult("Nome da UF é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(uf.Sigla))
            {
                return new BadRequestObjectResult("Sigla da UF é obrigatória.");
            }

            if (string.IsNullOrWhiteSpace(uf.CodigoIbge))
            {
                return new BadRequestObjectResult("Código IBGE é obrigatório.");
            }

            // Verificar se o país existe
            var pais = await _context.Paises.FindAsync(uf.PaisId);
            if (pais == null)
            {
                return new BadRequestObjectResult("País não encontrado.");
            }

            // Verificar se já existe outra UF com mesma sigla no mesmo país (exceto a atual)
            if (await _context.UFs.AnyAsync(u => u.Id != id && u.PaisId == uf.PaisId && u.Sigla.ToUpper() == uf.Sigla.ToUpper()))
            {
                return new BadRequestObjectResult($"Já existe outra UF com a sigla {uf.Sigla} neste país.");
            }

            // Verificar se já existe outra UF com mesmo código IBGE (exceto a atual)
            if (await _context.UFs.AnyAsync(u => u.Id != id && u.CodigoIbge == uf.CodigoIbge))
            {
                return new BadRequestObjectResult($"Já existe outra UF com o código IBGE {uf.CodigoIbge}.");
            }

            try
            {
                ufExistente.PaisId = uf.PaisId;
                ufExistente.Nome = uf.Nome;
                ufExistente.Sigla = uf.Sigla;
                ufExistente.CodigoIbge = uf.CodigoIbge;
                ufExistente.Regiao = uf.Regiao;
                ufExistente.Capital = uf.Capital;
                ufExistente.Ativo = uf.Ativo;

                _context.UFs.Update(ufExistente);
                await _context.SaveChangesAsync();

                return new NoContentResult();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await UFExisteAsync(id))
                {
                    return new NotFoundObjectResult($"UF com ID {id} não encontrada.");
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult> ExcluirUFAsync(int id)
        {
            var ufExistente = await _context.UFs.FindAsync(id);
            if (ufExistente == null)
            {
                return new NotFoundObjectResult($"UF com ID {id} não encontrada.");
            }

            try
            {
                _context.UFs.Remove(ufExistente);
                await _context.SaveChangesAsync();

                return new NoContentResult();
            }
            catch (DbUpdateException)
            {
                return new BadRequestObjectResult("Não é possível excluir a UF pois existem registros relacionados.");
            }
        }

        public async Task<ActionResult<IEnumerable<UF>>> BuscarUFsPorTermoAsync(string termo)
        {
            if (string.IsNullOrWhiteSpace(termo))
            {
                return await _context.UFs.Include(u => u.Pais).ToListAsync();
            }

            var termoLower = termo.ToLower();
            var ufsEncontradas = await _context.UFs
                .Include(u => u.Pais)
                .Where(u => u.Nome.ToLower().Contains(termoLower) ||
                           u.Sigla.ToLower().Contains(termoLower) ||
                           u.CodigoIbge.Contains(termoLower))
                .ToListAsync();

            return new OkObjectResult(ufsEncontradas);
        }

        public async Task<ActionResult<IEnumerable<UF>>> ListarUFsAtivasAsync()
        {
            var ufsAtivas = await _context.UFs
                .Where(u => u.Ativo == "Sim")
                .Include(u => u.Pais)
                .ToListAsync();
            return new OkObjectResult(ufsAtivas);
        }

        public async Task<ActionResult<IEnumerable<UF>>> BuscarUFsPorPaisAsync(int paisId)
        {
            var ufs = await _context.UFs
                .Where(u => u.PaisId == paisId)
                .Include(u => u.Pais)
                .ToListAsync();
            return new OkObjectResult(ufs);
        }

        public async Task<bool> UFExisteAsync(int id)
        {
            return await _context.UFs.AnyAsync(e => e.Id == id);
        }
    }
}
