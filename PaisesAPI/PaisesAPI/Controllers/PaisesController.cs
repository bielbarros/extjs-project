using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaisesAPI.Data;
using PaisesAPI.Models;

namespace PaisesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaisesController : ControllerBase
    {
        private readonly PaisesDbContext _context;

        public PaisesController(PaisesDbContext context)
        {
            _context = context;
        }

        // GET: api/paises - Listar todos os países
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pais>>> Get()
        {
            return await _context.Paises.ToListAsync();
        }

        // GET: api/paises/{id} - Buscar país por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Pais>> Get(int id)
        {
            var pais = await _context.Paises.FindAsync(id);
            if (pais == null)
            {
                return NotFound($"País com ID {id} não encontrado.");
            }
            return Ok(pais);
        }

        // POST: api/paises - Criar novo país
        [HttpPost]
        public async Task<ActionResult<Pais>> Post([FromBody] Pais pais)
        {
            Console.WriteLine($"POST recebido: Nome={pais?.Nome}, Sigla={pais?.Sigla}, CodigoBacen={pais?.CodigoBacen}, Ativo={pais?.Ativo}");
            
            if (pais == null)
            {
                return BadRequest("Dados do país não podem ser nulos.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(pais.Nome))
            {
                return BadRequest("Nome do país é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pais.Sigla))
            {
                return BadRequest("Sigla do país é obrigatória.");
            }

            if (string.IsNullOrWhiteSpace(pais.CodigoBacen))
            {
                return BadRequest("Código BACEN é obrigatório.");
            }

            // Verificar se já existe país com mesma sigla
            if (await _context.Paises.AnyAsync(p => p.Sigla.ToUpper() == pais.Sigla.ToUpper()))
            {
                return BadRequest($"Já existe um país com a sigla {pais.Sigla}.");
            }

            // Verificar se já existe país com mesmo código BACEN
            if (await _context.Paises.AnyAsync(p => p.CodigoBacen == pais.CodigoBacen))
            {
                return BadRequest($"Já existe um país com o código BACEN {pais.CodigoBacen}.");
            }

            _context.Paises.Add(pais);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = pais.Id }, pais);
        }

        // PUT: api/paises/{id} - Atualizar país existente
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Pais pais)
        {
            if (pais == null)
            {
                return BadRequest("Dados do país não podem ser nulos.");
            }

            // Definir o ID do país com base no parâmetro da URL
            pais.Id = id;

            // Verificar se o país existe
            var paisExistente = await _context.Paises.FindAsync(id);
            if (paisExistente == null)
            {
                return NotFound($"País com ID {id} não encontrado.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(pais.Nome))
            {
                return BadRequest("Nome do país é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(pais.Sigla))
            {
                return BadRequest("Sigla do país é obrigatória.");
            }

            if (string.IsNullOrWhiteSpace(pais.CodigoBacen))
            {
                return BadRequest("Código BACEN é obrigatório.");
            }

            // Verificar se já existe outro país com mesma sigla (exceto o atual)
            if (await _context.Paises.AnyAsync(p => p.Id != id && p.Sigla.ToUpper() == pais.Sigla.ToUpper()))
            {
                return BadRequest($"Já existe outro país com a sigla {pais.Sigla}.");
            }

            // Verificar se já existe outro país com mesmo código BACEN (exceto o atual)
            if (await _context.Paises.AnyAsync(p => p.Id != id && p.CodigoBacen == pais.CodigoBacen))
            {
                return BadRequest($"Já existe outro país com o código BACEN {pais.CodigoBacen}.");
            }

            try
            {
                // Atualizar propriedades
                paisExistente.Nome = pais.Nome;
                paisExistente.Sigla = pais.Sigla;
                paisExistente.CodigoBacen = pais.CodigoBacen;
                paisExistente.Ativo = pais.Ativo;

                _context.Paises.Update(paisExistente);
                await _context.SaveChangesAsync();

                return NoContent(); // 204 - Sucesso sem conteúdo
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await PaisExists(id))
                {
                    return NotFound($"País com ID {id} não encontrado.");
                }
                else
                {
                    throw;
                }
            }
        }

        // DELETE: api/paises/{id} - Remover país
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var paisExistente = await _context.Paises.FindAsync(id);
            if (paisExistente == null)
            {
                return NotFound($"País com ID {id} não encontrado.");
            }

            try
            {
                _context.Paises.Remove(paisExistente);
                await _context.SaveChangesAsync();

                return NoContent(); // 204 - Sucesso sem conteúdo
            }
            catch (DbUpdateException)
            {
                return BadRequest("Não é possível excluir o país pois existem registros relacionados.");
            }
        }

        // GET: api/paises/search?termo=brasil - Buscar países por termo
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Pais>>> Search([FromQuery] string termo)
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

            return Ok(paisesEncontrados);
        }

        // GET: api/paises/ativos - Listar apenas países ativos
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<Pais>>> GetAtivos()
        {
            var paisesAtivos = await _context.Paises.Where(p => p.Ativo).ToListAsync();
            return Ok(paisesAtivos);
        }

        // Método auxiliar para verificar se o país existe
        private async Task<bool> PaisExists(int id)
        {
            return await _context.Paises.AnyAsync(e => e.Id == id);
        }
    }
}

