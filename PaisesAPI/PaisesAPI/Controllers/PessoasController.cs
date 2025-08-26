using Microsoft.AspNetCore.Mvc;
using PaisesAPI.Models;
using PaisesAPI.Services;

namespace PaisesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PessoasController : ControllerBase
    {
        private readonly IPessoaService _pessoaService;

        public PessoasController(IPessoaService pessoaService)
        {
            _pessoaService = pessoaService;
        }

        // GET: api/pessoas - Listar todas as pessoas
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pessoa>>> Get()
        {
            return await _pessoaService.ListarPessoasAsync();
        }

        // GET: api/pessoas/{id} - Buscar pessoa por ID
        [HttpGet("{id}")]
        public async Task<ActionResult<Pessoa>> Get(int id)
        {
            return await _pessoaService.BuscarPessoaPorIdAsync(id);
        }

        // POST: api/pessoas - Criar nova pessoa
        [HttpPost]
        public async Task<ActionResult<Pessoa>> Post([FromBody] Pessoa pessoa)
        {
            return await _pessoaService.CriarPessoaAsync(pessoa);
        }

        // PUT: api/pessoas/{id} - Atualizar pessoa existente
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, [FromBody] Pessoa pessoa)
        {
            return await _pessoaService.AtualizarPessoaAsync(id, pessoa);
        }

        // DELETE: api/pessoas/{id} - Remover pessoa
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            return await _pessoaService.ExcluirPessoaAsync(id);
        }

        // GET: api/pessoas/ativos - Listar apenas pessoas ativas
        [HttpGet("ativos")]
        public async Task<ActionResult<IEnumerable<Pessoa>>> GetAtivos()
        {
            return await _pessoaService.ListarPessoasAtivasAsync();
        }

        // GET: api/pessoas/cpf/{cpf} - Buscar pessoa por CPF
        [HttpGet("cpf/{cpf}")]
        public async Task<ActionResult<Pessoa>> GetByCpf(string cpf)
        {
            return await _pessoaService.BuscarPessoaPorCPFAsync(cpf);
        }

        private async Task<bool> PessoaExists(int id)
        {
            return await _pessoaService.PessoaExisteAsync(id);
        }
    }
}
