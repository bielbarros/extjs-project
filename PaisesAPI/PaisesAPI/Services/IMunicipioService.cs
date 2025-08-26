using Microsoft.AspNetCore.Mvc;
using PaisesAPI.Models;

namespace PaisesAPI.Services
{
    public interface IMunicipioService
    {
        Task<ActionResult<IEnumerable<Municipio>>> ListarMunicipiosAsync();
        Task<ActionResult<Municipio>> BuscarMunicipioPorIdAsync(int id);
        Task<ActionResult<Municipio>> CriarMunicipioAsync(Municipio municipio);
        Task<ActionResult> AtualizarMunicipioAsync(int id, Municipio municipio);
        Task<ActionResult> ExcluirMunicipioAsync(int id);
        Task<ActionResult<IEnumerable<Municipio>>> BuscarMunicipiosPorTermoAsync(string termo);
        Task<ActionResult<IEnumerable<Municipio>>> ListarMunicipiosAtivosAsync();
        Task<ActionResult<IEnumerable<Municipio>>> BuscarMunicipiosPorUFAsync(int ufId);
        Task<ActionResult<IEnumerable<Municipio>>> BuscarMunicipiosPorPaisAsync(int paisId);
        Task<bool> MunicipioExisteAsync(int id);
    }
}
