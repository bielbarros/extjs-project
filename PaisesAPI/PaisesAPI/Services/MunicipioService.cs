using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PaisesAPI.Data;
using PaisesAPI.Models;

namespace PaisesAPI.Services
{
    public class MunicipioService : IMunicipioService
    {
        private readonly PaisesDbContext _context;

        public MunicipioService(PaisesDbContext context)
        {
            _context = context;
        }

        public async Task<ActionResult<IEnumerable<Municipio>>> ListarMunicipiosAsync()
        {
            return await _context.Municipios
                .Include(m => m.Pais)
                .Include(m => m.UF)
                .ToListAsync();
        }

        public async Task<ActionResult<Municipio>> BuscarMunicipioPorIdAsync(int id)
        {
            var municipio = await _context.Municipios
                .Include(m => m.Pais)
                .Include(m => m.UF)
                .FirstOrDefaultAsync(m => m.Id == id);
            
            if (municipio == null)
            {
                return new NotFoundObjectResult($"Município com ID {id} não encontrado.");
            }
            return new OkObjectResult(municipio);
        }

        public async Task<ActionResult<Municipio>> CriarMunicipioAsync(Municipio municipio)
        {
            if (municipio == null)
            {
                return new BadRequestObjectResult("Dados do município não podem ser nulos.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(municipio.Nome))
            {
                return new BadRequestObjectResult("Nome do município é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(municipio.CodigoIbge))
            {
                return new BadRequestObjectResult("Código IBGE é obrigatório.");
            }

            // Verificar se o país existe
            var pais = await _context.Paises.FindAsync(municipio.PaisId);
            if (pais == null)
            {
                return new BadRequestObjectResult("País não encontrado.");
            }

            // Verificar se a UF existe
            var uf = await _context.UFs.FindAsync(municipio.UfId);
            if (uf == null)
            {
                return new BadRequestObjectResult("UF não encontrada.");
            }

            // Verificar se a UF pertence ao país
            if (uf.PaisId != municipio.PaisId)
            {
                return new BadRequestObjectResult("A UF não pertence ao país selecionado.");
            }

            // Verificar se já existe município com mesmo código IBGE
            if (await _context.Municipios.AnyAsync(m => m.CodigoIbge == municipio.CodigoIbge))
            {
                return new BadRequestObjectResult($"Já existe um município com o código IBGE {municipio.CodigoIbge}.");
            }

            _context.Municipios.Add(municipio);
            await _context.SaveChangesAsync();

            return new CreatedAtActionResult("Get", "Municipios", new { id = municipio.Id }, municipio);
        }

        public async Task<ActionResult> AtualizarMunicipioAsync(int id, Municipio municipio)
        {
            if (municipio == null)
            {
                return new BadRequestObjectResult("Dados do município não podem ser nulos.");
            }

            municipio.Id = id;

            var municipioExistente = await _context.Municipios.FindAsync(id);
            if (municipioExistente == null)
            {
                return new NotFoundObjectResult($"Município com ID {id} não encontrado.");
            }

            // Validações básicas
            if (string.IsNullOrWhiteSpace(municipio.Nome))
            {
                return new BadRequestObjectResult("Nome do município é obrigatório.");
            }

            if (string.IsNullOrWhiteSpace(municipio.CodigoIbge))
            {
                return new BadRequestObjectResult("Código IBGE é obrigatório.");
            }

            // Verificar se o país existe
            var pais = await _context.Paises.FindAsync(municipio.PaisId);
            if (pais == null)
            {
                return new BadRequestObjectResult("País não encontrado.");
            }

            // Verificar se a UF existe
            var uf = await _context.UFs.FindAsync(municipio.UfId);
            if (uf == null)
            {
                return new BadRequestObjectResult("UF não encontrada.");
            }

            // Verificar se a UF pertence ao país
            if (uf.PaisId != municipio.PaisId)
            {
                return new BadRequestObjectResult("A UF não pertence ao país selecionado.");
            }

            // Verificar se já existe outro município com mesmo código IBGE (exceto o atual)
            if (await _context.Municipios.AnyAsync(m => m.Id != id && m.CodigoIbge == municipio.CodigoIbge))
            {
                return new BadRequestObjectResult($"Já existe outro município com o código IBGE {municipio.CodigoIbge}.");
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

                return new NoContentResult();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await MunicipioExisteAsync(id))
                {
                    return new NotFoundObjectResult($"Município com ID {id} não encontrado.");
                }
                else
                {
                    throw;
                }
            }
        }

        public async Task<ActionResult> ExcluirMunicipioAsync(int id)
        {
            var municipioExistente = await _context.Municipios.FindAsync(id);
            if (municipioExistente == null)
            {
                return new NotFoundObjectResult($"Município com ID {id} não encontrado.");
            }

            try
            {
                _context.Municipios.Remove(municipioExistente);
                await _context.SaveChangesAsync();

                return new NoContentResult();
            }
            catch (DbUpdateException)
            {
                return new BadRequestObjectResult("Não é possível excluir o município pois existem registros relacionados.");
            }
        }

        public async Task<ActionResult<IEnumerable<Municipio>>> BuscarMunicipiosPorTermoAsync(string termo)
        {
            if (string.IsNullOrWhiteSpace(termo))
            {
                return await _context.Municipios
                    .Include(m => m.Pais)
                    .Include(m => m.UF)
                    .ToListAsync();
            }

            var termoLower = termo.ToLower();
            var municipiosEncontrados = await _context.Municipios
                .Include(m => m.Pais)
                .Include(m => m.UF)
                .Where(m => m.Nome.ToLower().Contains(termoLower) ||
                           m.CodigoIbge.Contains(termoLower))
                .ToListAsync();

            return new OkObjectResult(municipiosEncontrados);
        }

        public async Task<ActionResult<IEnumerable<Municipio>>> ListarMunicipiosAtivosAsync()
        {
            var municipiosAtivos = await _context.Municipios
                .Where(m => m.Ativo == "Sim")
                .Include(m => m.Pais)
                .Include(m => m.UF)
                .ToListAsync();
            return new OkObjectResult(municipiosAtivos);
        }

        public async Task<ActionResult<IEnumerable<Municipio>>> BuscarMunicipiosPorUFAsync(int ufId)
        {
            var municipios = await _context.Municipios
                .Where(m => m.UfId == ufId)
                .Include(m => m.Pais)
                .Include(m => m.UF)
                .ToListAsync();
            return new OkObjectResult(municipios);
        }

        public async Task<ActionResult<IEnumerable<Municipio>>> BuscarMunicipiosPorPaisAsync(int paisId)
        {
            var municipios = await _context.Municipios
                .Where(m => m.PaisId == paisId)
                .Include(m => m.Pais)
                .Include(m => m.UF)
                .ToListAsync();
            return new OkObjectResult(municipios);
        }

        public async Task<bool> MunicipioExisteAsync(int id)
        {
            return await _context.Municipios.AnyAsync(e => e.Id == id);
        }
    }
}
