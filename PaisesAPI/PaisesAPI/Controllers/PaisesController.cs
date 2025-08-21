using Microsoft.AspNetCore.Mvc;
using PaisesAPI.Data;
using PaisesAPI.Models;

namespace PaisesAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaisesController : ControllerBase
    {
        // GET: api/paises - Listar todos os países
        [HttpGet]
        public ActionResult<IEnumerable<Pais>> Get()
        {
            return Ok(DbMem.Paises);
        }

        // GET: api/paises/{id} - Buscar país por ID
        [HttpGet("{id}")]
        public ActionResult<Pais> Get(int id)
        {
            var pais = DbMem.GetPais(id);
            if (pais == null)
            {
                return NotFound($"País com ID {id} não encontrado.");
            }
            return Ok(pais);
        }

        // POST: api/paises - Criar novo país
        [HttpPost]
        public ActionResult<Pais> Post([FromBody] Pais pais)
        {
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
            if (DbMem.Paises.Any(p => p.Sigla.ToUpper() == pais.Sigla.ToUpper()))
            {
                return BadRequest($"Já existe um país com a sigla {pais.Sigla}.");
            }

            // Verificar se já existe país com mesmo código BACEN
            if (DbMem.Paises.Any(p => p.CodigoBacen == pais.CodigoBacen))
            {
                return BadRequest($"Já existe um país com o código BACEN {pais.CodigoBacen}.");
            }

            var novoPais = DbMem.AddPais(pais);
            return CreatedAtAction(nameof(Get), new { id = novoPais.Id }, novoPais);
        }

        // PUT: api/paises/{id} - Atualizar país existente
        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Pais pais)
        {
            if (pais == null)
            {
                return BadRequest("Dados do país não podem ser nulos.");
            }

            // Verificar se o país existe
            var paisExistente = DbMem.GetPais(id);
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
            if (DbMem.Paises.Any(p => p.Id != id && p.Sigla.ToUpper() == pais.Sigla.ToUpper()))
            {
                return BadRequest($"Já existe outro país com a sigla {pais.Sigla}.");
            }

            // Verificar se já existe outro país com mesmo código BACEN (exceto o atual)
            if (DbMem.Paises.Any(p => p.Id != id && p.CodigoBacen == pais.CodigoBacen))
            {
                return BadRequest($"Já existe outro país com o código BACEN {pais.CodigoBacen}.");
            }

            var sucesso = DbMem.UpdatePais(id, p =>
            {
                p.Nome = pais.Nome;
                p.Sigla = pais.Sigla;
                p.CodigoBacen = pais.CodigoBacen;
                p.Ativo = pais.Ativo;
            });

            if (sucesso)
            {
                return NoContent(); // 204 - Sucesso sem conteúdo
            }

            return BadRequest("Erro ao atualizar o país.");
        }

        // DELETE: api/paises/{id} - Remover país
        [HttpDelete("{id}")]
        public ActionResult Delete(int id)
        {
            var paisExistente = DbMem.GetPais(id);
            if (paisExistente == null)
            {
                return NotFound($"País com ID {id} não encontrado.");
            }

            var sucesso = DbMem.RemovePais(id);
            if (sucesso)
            {
                return NoContent(); // 204 - Sucesso sem conteúdo
            }

            return BadRequest("Erro ao remover o país.");
        }

        // GET: api/paises/search?termo=brasil - Buscar países por termo
        [HttpGet("search")]
        public ActionResult<IEnumerable<Pais>> Search([FromQuery] string termo)
        {
            if (string.IsNullOrWhiteSpace(termo))
            {
                return Ok(DbMem.Paises); // Retorna todos se não houver termo
            }

            var termoLower = termo.ToLower();
            var paisesEncontrados = DbMem.Paises.Where(p =>
                p.Nome.ToLower().Contains(termoLower) ||
                p.Sigla.ToLower().Contains(termoLower) ||
                p.CodigoBacen.Contains(termoLower)
            );

            return Ok(paisesEncontrados);
        }

        // GET: api/paises/ativos - Listar apenas países ativos
        [HttpGet("ativos")]
        public ActionResult<IEnumerable<Pais>> GetAtivos()
        {
            var paisesAtivos = DbMem.Paises.Where(p => p.Ativo);
            return Ok(paisesAtivos);
        }
    }
}
