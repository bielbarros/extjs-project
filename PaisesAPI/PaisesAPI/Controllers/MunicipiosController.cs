using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaisesAPI.Data;
using PaisesAPI.Models;

namespace PaisesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MunicipiosController : ControllerBase
    {
        private readonly PaisesDbContext _context;

        public MunicipiosController(PaisesDbContext context)
        {
            _context = context;
        }

        // GET: api/municipios - Listar todos os municípios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Municipio>>> Get()
        {
            return await _context.Municipios
                .Include(m => m.Pais)
                .Include(m => m.UF)
                .ToListAsync();
        }

        // GET: api/municipios/{id} - Buscar município por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Municipio>> Get(int id)
        {
            var municipio = await _context.Municipios
                .Include(m => m.Pais)
                .Include(m => m.UF)
                .FirstOrDefaultAsync(m => m.Id == id);
            
            if (municipio == null)
            {
                return NotFound($"Município com ID {id} não encontrado.");
            }
            return Ok(municipio);
        }

        // POST: api/municipios - Criar novo município
        [HttpPost]
        public async Task<ActionResult<Municipio>> Post([FromBody] Municipio municipio)
        {
            if (municipio == null)
            {
                return BadRequest("Dados do município não podem ser nulos.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(municipio.Nome))
            {
                return BadRequest("Nome do município é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(municipio.CodigoIbge))
            {
                return BadRequest("Código IBGE é obrigatório.");
            }

            // Verificar se o país existe
            var pais = await _context.Paises.FindAsync(municipio.PaisId);
            if (pais == null)
            {
                return BadRequest("País não encontrado.");
            }

            // Verificar se a UF existe
            var uf = await _context.UFs.FindAsync(municipio.UfId);
            if (uf == null)
            {
                return BadRequest("UF não encontrada.");
            }

            // Verificar se a UF pertence ao país
            if (uf.PaisId != municipio.PaisId)
            {
                return BadRequest("A UF não pertence ao país selecionado.");
            }

            // Verificar se já existe município com mesmo código IBGE
            if (await _context.Municipios.AnyAsync(m => m.CodigoIbge == municipio.CodigoIbge))
            {
                return BadRequest($"Já existe um município com o código IBGE {municipio.CodigoIbge}.");
            }

            _context.Municipios.Add(municipio);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = municipio.Id }, municipio);
        }

        // PUT: api/municipios/{id} - Atualizar município existente
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Municipio municipio)
        {
            if (municipio == null)
            {
                return BadRequest("Dados do município não podem ser nulos.");
            }

            municipio.Id = id;

            var municipioExistente = await _context.Municipios.FindAsync(id);
            if (municipioExistente == null)
            {
                return NotFound($"Município com ID {id} não encontrado.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(municipio.Nome))
            {
                return BadRequest("Nome do município é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(municipio.CodigoIbge))
            {
                return BadRequest("Código IBGE é obrigatório.");
            }

            // Verificar se o país existe
            var pais = await _context.Paises.FindAsync(municipio.PaisId);
            if (pais == null)
            {
                return BadRequest("País não encontrado.");
            }

            // Verificar se a UF existe
            var uf = await _context.UFs.FindAsync(municipio.UfId);
            if (uf == null)
            {
                return BadRequest("UF não encontrada.");
            }

            // Verificar se a UF pertence ao país
            if (uf.PaisId != municipio.PaisId)
            {
                return BadRequest("A UF não pertence ao país selecionado.");
            }

            // Verificar se já existe outro município com mesmo código IBGE (exceto o atual)
            if (await _context.Municipios.AnyAsync(m => m.Id != id && m.CodigoIbge == municipio.CodigoIbge))
            {
                return BadRequest($"Já existe outro município com o código IBGE {municipio.CodigoIbge}.");
            }

            try
            {
                municipioExistente.PaisId = municipio.PaisId;
                municipioExistente.UfId = municipio.UfId;
                municipioExistente.Nome = municipio.Nome;
                municipioExistente.CodigoIbge = municipio.CodigoIbge;
                municipioExistente.CodigoSiafi = municipio.CodigoSiafi;
                municipioExistente.Ddd = municipio.Ddd;
                municipioExistente.CepInicial = municipio.CepInicial;
                municipioExistente.CepFinal = municipio.CepFinal;
                municipioExistente.Timezone = municipio.Timezone;
                municipioExistente.Latitude = municipio.Latitude;
                municipioExistente.Longitude = municipio.Longitude;
                municipioExistente.Observacao = municipio.Observacao;
                municipioExistente.Ativo = municipio.Ativo;

                _context.Municipios.Update(municipioExistente);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await MunicipioExists(id))
                {
                    return NotFound($"Município com ID {id} não encontrado.");
                }
                else
                {
                    throw;
                }
            }
        }

        // DELETE: api/municipios/{id} - Remover município
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var municipioExistente = await _context.Municipios.FindAsync(id);
            if (municipioExistente == null)
            {
                return NotFound($"Município com ID {id} não encontrado.");
            }

            try
            {
                _context.Municipios.Remove(municipioExistente);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (DbUpdateException)
            {
                return BadRequest("Não é possível excluir o município pois existem registros relacionados.");
            }
        }

        // GET: api/municipios/uf/{ufId} - Listar municípios por UF
        [HttpGet("uf/{ufId}")]
        public async Task<ActionResult<IEnumerable<Municipio>>> GetByUF(int ufId)
        {
            var municipios = await _context.Municipios
                .Where(m => m.UfId == ufId)
                .Include(m => m.Pais)
                .Include(m => m.UF)
                .ToListAsync();
            return Ok(municipios);
        }

        // GET: api/municipios/ativos - Listar apenas municípios ativos
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<Municipio>>> GetAtivos()
        {
            var municipiosAtivos = await _context.Municipios
                .Where(m => m.Ativo == "Sim")
                .Include(m => m.Pais)
                .Include(m => m.UF)
                .ToListAsync();
            return Ok(municipiosAtivos);
        }

        private async Task<bool> MunicipioExists(int id)
        {
            return await _context.Municipios.AnyAsync(e => e.Id == id);
        }
    }
}
