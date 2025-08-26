using Microsoft.AspNetCore.Mvc;
using PaisesAPI.Models;

namespace PaisesAPI.Services
{
    public interface IPessoaService
    {
        Task<ActionResult<IEnumerable<Pessoa>>> ListarPessoasAsync();
        Task<ActionResult<Pessoa>> BuscarPessoaPorIdAsync(int id);
        Task<ActionResult<Pessoa>> CriarPessoaAsync(Pessoa pessoa);
        Task<ActionResult> AtualizarPessoaAsync(int id, Pessoa pessoa);
        Task<ActionResult> ExcluirPessoaAsync(int id);
        Task<ActionResult<IEnumerable<Pessoa>>> BuscarPessoasPorTermoAsync(string termo);
        Task<ActionResult<IEnumerable<Pessoa>>> ListarPessoasAtivasAsync();
        Task<ActionResult<Pessoa>> BuscarPessoaPorCPFAsync(string cpf);
        Task<bool> PessoaExisteAsync(int id);
    }
}
