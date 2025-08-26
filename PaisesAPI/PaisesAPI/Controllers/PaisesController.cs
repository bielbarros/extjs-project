using Microsoft.AspNetCore.Mvc;
using PaisesAPI.Models;
using PaisesAPI.Services;

namespace PaisesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaisesController : ControllerBase
    {
        private readonly IPaisService _paisService;

        public PaisesController(IPaisService paisService)
        {
            _paisService = paisService;
        }

        // GET: api/paises - Listar todos os países
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pais>>> Get()
        {
            return await _paisService.ListarPaisesAsync();
        }

        // GET: api/paises/{id} - Buscar país por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Pais>> Get(int id)
        {
            return await _paisService.BuscarPaisPorIdAsync(id);
        }

        // POST: api/paises - Criar novo país
        [HttpPost]
        public async Task<ActionResult<Pais>> Post([FromBody] Pais pais)
        {
            return await _paisService.CriarPaisAsync(pais);
        }

        // PUT: api/paises/{id} - Atualizar país existente
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Pais pais)
        {
            return await _paisService.AtualizarPaisAsync(id, pais);
        }

        // DELETE: api/paises/{id} - Remover país
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await _paisService.ExcluirPaisAsync(id);
        }

        // GET: api/paises/search?termo=brasil - Buscar países por termo
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Pais>>> Search([FromQuery] string termo)
        {
            return await _paisService.BuscarPaisesPorTermoAsync(termo);
        }

        // GET: api/paises/ativos - Listar apenas países ativos
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<Pais>>> GetAtivos()
        {
            return await _paisService.ListarPaisesAtivosAsync();
        }

        // Método auxiliar para verificar se o país existe
        private async Task<bool> PaisExists(int id)
        {
            return await _paisService.PaisExisteAsync(id);
        }
    }
}

