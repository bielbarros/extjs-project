using Microsoft.AspNetCore.Mvc;
using PaisesAPI.Models;

namespace PaisesAPI.Services
{
    public interface IPaisService
    {
        Task<ActionResult<IEnumerable<Pais>>> ListarPaisesAsync();
        Task<ActionResult<Pais>> BuscarPaisPorIdAsync(int id);
        Task<ActionResult<Pais>> CriarPaisAsync(Pais pais);
        Task<ActionResult> AtualizarPaisAsync(int id, Pais pais);
        Task<ActionResult> ExcluirPaisAsync(int id);
        Task<ActionResult<IEnumerable<Pais>>> BuscarPaisesPorTermoAsync(string termo);
        Task<ActionResult<IEnumerable<Pais>>> ListarPaisesAtivosAsync();
        Task<bool> PaisExisteAsync(int id);
    }
}
