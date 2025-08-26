using Microsoft.AspNetCore.Mvc;
using PaisesAPI.Models;
using PaisesAPI.Services;

namespace PaisesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MunicipiosController : ControllerBase
    {
        private readonly IMunicipioService _municipioService;

        public MunicipiosController(IMunicipioService municipioService)
        {
            _municipioService = municipioService;
        }

        // GET: api/municipios - Listar todos os municípios
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Municipio>>> Get()
        {
            return await _municipioService.ListarMunicipiosAsync();
        }

        // GET: api/municipios/{id} - Buscar município por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Municipio>> Get(int id)
        {
            return await _municipioService.BuscarMunicipioPorIdAsync(id);
        }

        // POST: api/municipios - Criar novo município
        [HttpPost]
        public async Task<ActionResult<Municipio>> Post([FromBody] Municipio municipio)
        {
            return await _municipioService.CriarMunicipioAsync(municipio);
        }

        // PUT: api/municipios/{id} - Atualizar município existente
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Municipio municipio)
        {
            return await _municipioService.AtualizarMunicipioAsync(id, municipio);
        }

        // DELETE: api/municipios/{id} - Remover município
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await _municipioService.ExcluirMunicipioAsync(id);
        }

        // GET: api/municipios/uf/{ufId} - Listar municípios por UF
        [HttpGet("uf/{ufId}")]
        public async Task<ActionResult<IEnumerable<Municipio>>> GetByUF(int ufId)
        {
            return await _municipioService.BuscarMunicipiosPorUFAsync(ufId);
        }

        // GET: api/municipios/ativos - Listar apenas municípios ativos
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<Municipio>>> GetAtivos()
        {
            return await _municipioService.ListarMunicipiosAtivosAsync();
        }

        private async Task<bool> MunicipioExists(int id)
        {
            return await _municipioService.MunicipioExisteAsync(id);
        }
    }
}
