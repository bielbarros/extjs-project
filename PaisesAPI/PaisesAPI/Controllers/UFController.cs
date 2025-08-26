using Microsoft.AspNetCore.Mvc;
using PaisesAPI.Models;
using PaisesAPI.Services;

namespace PaisesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UFsController : ControllerBase
    {
        private readonly IUFService _ufService;

        public UFsController(IUFService ufService)
        {
            _ufService = ufService;
        }

        // GET: api/ufs - Listar todas as UFs
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UF>>> Get()
        {
            return await _ufService.ListarUFsAsync();
        }

        // GET: api/ufs/{id} - Buscar UF por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<UF>> Get(int id)
        {
            return await _ufService.BuscarUFPorIdAsync(id);
        }

        // POST: api/ufs - Criar nova UF
        [HttpPost]
        public async Task<ActionResult<UF>> Post([FromBody] UF uf)
        {
            return await _ufService.CriarUFAsync(uf);
        }

        // PUT: api/ufs/{id} - Atualizar UF existente
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] UF uf)
        {
            return await _ufService.AtualizarUFAsync(id, uf);
        }

        // DELETE: api/ufs/{id} - Remover UF
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await _ufService.ExcluirUFAsync(id);
        }

        // GET: api/ufs/pais/{paisId} - Listar UFs por país
        [HttpGet("pais/{paisId}")]
        public async Task<ActionResult<IEnumerable<UF>>> GetByPais(int paisId)
        {
            return await _ufService.BuscarUFsPorPaisAsync(paisId);
        }

        // GET: api/ufs/ativos - Listar apenas UFs ativas
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<UF>>> GetAtivos()
        {
            return await _ufService.ListarUFsAtivasAsync();
        }

        private async Task<bool> UFExists(int id)
        {
            return await _ufService.UFExisteAsync(id);
        }
    }
}
