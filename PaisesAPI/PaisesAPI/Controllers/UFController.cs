using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaisesAPI.Data;
using PaisesAPI.Models;

namespace PaisesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UFsController : ControllerBase
    {
        private readonly PaisesDbContext _context;

        public UFsController(PaisesDbContext context)
        {
            _context = context;
        }

        // GET: api/ufs - Listar todas as UFs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UF>>> Get()
        {
            return await _context.UFs.Include(u => u.Pais).ToListAsync();
        }

        // GET: api/ufs/{id} - Buscar UF por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<UF>> Get(int id)
        {
            var uf = await _context.UFs.Include(u => u.Pais).FirstOrDefaultAsync(u => u.Id == id);
            if (uf == null)
            {
                return NotFound($"UF com ID {id} não encontrada.");
            }
            return Ok(uf);
        }

        // POST: api/ufs - Criar nova UF
        [HttpPost]
        public async Task<ActionResult<UF>> Post([FromBody] UF uf)
        {
            if (uf == null)
            {
                return BadRequest("Dados da UF não podem ser nulos.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(uf.Nome))
            {
                return BadRequest("Nome da UF é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(uf.Sigla))
            {
                return BadRequest("Sigla da UF é obrigatória.");
            }

            if (string.IsNullOrWhiteSpace(uf.CodigoIbge))
            {
                return BadRequest("Código IBGE é obrigatório.");
            }

            // Verificar se o país existe
            var pais = await _context.Paises.FindAsync(uf.PaisId);
            if (pais == null)
            {
                return BadRequest("País não encontrado.");
            }

            // Verificar se já existe UF com mesma sigla no mesmo país
            if (await _context.UFs.AnyAsync(u => u.PaisId == uf.PaisId && u.Sigla.ToUpper() == uf.Sigla.ToUpper()))
            {
                return BadRequest($"Já existe uma UF com a sigla {uf.Sigla} neste país.");
            }

            // Verificar se já existe UF com mesmo código IBGE
            if (await _context.UFs.AnyAsync(u => u.CodigoIbge == uf.CodigoIbge))
            {
                return BadRequest($"Já existe uma UF com o código IBGE {uf.CodigoIbge}.");
            }

            _context.UFs.Add(uf);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = uf.Id }, uf);
        }

        // PUT: api/ufs/{id} - Atualizar UF existente
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UF uf)
        {
            if (uf == null)
            {
                return BadRequest("Dados da UF não podem ser nulos.");
            }

            uf.Id = id;

            var ufExistente = await _context.UFs.FindAsync(id);
            if (ufExistente == null)
            {
                return NotFound($"UF com ID {id} não encontrada.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(uf.Nome))
            {
                return BadRequest("Nome da UF é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(uf.Sigla))
            {
                return BadRequest("Sigla da UF é obrigatória.");
            }

            if (string.IsNullOrWhiteSpace(uf.CodigoIbge))
            {
                return BadRequest("Código IBGE é obrigatório.");
            }

            // Verificar se o país existe
            var pais = await _context.Paises.FindAsync(uf.PaisId);
            if (pais == null)
            {
                return BadRequest("País não encontrado.");
            }

            // Verificar se já existe outra UF com mesma sigla no mesmo país (exceto a atual)
            if (await _context.UFs.AnyAsync(u => u.Id != id && u.PaisId == uf.PaisId && u.Sigla.ToUpper() == uf.Sigla.ToUpper()))
            {
                return BadRequest($"Já existe outra UF com a sigla {uf.Sigla} neste país.");
            }

            // Verificar se já existe outra UF com mesmo código IBGE (exceto a atual)
            if (await _context.UFs.AnyAsync(u => u.Id != id && u.CodigoIbge == uf.CodigoIbge))
            {
                return BadRequest($"Já existe outra UF com o código IBGE {uf.CodigoIbge}.");
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

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await UFExists(id))
                {
                    return NotFound($"UF com ID {id} não encontrada.");
                }
                else
                {
                    throw;
                }
            }
        }

        // DELETE: api/ufs/{id} - Remover UF
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var ufExistente = await _context.UFs.FindAsync(id);
            if (ufExistente == null)
            {
                return NotFound($"UF com ID {id} não encontrada.");
            }

            try
            {
                _context.UFs.Remove(ufExistente);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateException)
            {
                return BadRequest("Não é possível excluir a UF pois existem registros relacionados.");
            }
        }

        // GET: api/ufs/pais/{paisId} - Listar UFs por país
        [HttpGet("pais/{paisId}")]
        public async Task<ActionResult<IEnumerable<UF>>> GetByPais(int paisId)
        {
            var ufs = await _context.UFs
                .Where(u => u.PaisId == paisId)
                .Include(u => u.Pais)
                .ToListAsync();
            return Ok(ufs);
        }

        // GET: api/ufs/ativos - Listar apenas UFs ativas
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<UF>>> GetAtivos()
        {
            var ufsAtivas = await _context.UFs
                .Where(u => u.Ativo == "Sim")
                .Include(u => u.Pais)
                .ToListAsync();
            return Ok(ufsAtivas);
        }

        private async Task<bool> UFExists(int id)
        {
            return await _context.UFs.AnyAsync(e => e.Id == id);
        }
    }
}
