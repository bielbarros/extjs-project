using Microsoft.AspNetCore.Mvc;
using PaisesAPI.Models;

namespace PaisesAPI.Services
{
    public interface IUFService
    {
        Task<ActionResult<IEnumerable<UF>>> ListarUFsAsync();
        Task<ActionResult<UF>> BuscarUFPorIdAsync(int id);
        Task<ActionResult<UF>> CriarUFAsync(UF uf);
        Task<ActionResult> AtualizarUFAsync(int id, UF uf);
        Task<ActionResult> ExcluirUFAsync(int id);
        Task<ActionResult<IEnumerable<UF>>> BuscarUFsPorTermoAsync(string termo);
        Task<ActionResult<IEnumerable<UF>>> ListarUFsAtivasAsync();
        Task<ActionResult<IEnumerable<UF>>> BuscarUFsPorPaisAsync(int paisId);
        Task<bool> UFExisteAsync(int id);
    }
}
