package dev.bstk.wfinance.lancamento.domain;

import dev.bstk.wfinance.categoria.domain.CategoriaRepository;
import dev.bstk.wfinance.core.exception.DadosInvalidosException;
import dev.bstk.wfinance.lancamento.api.request.AtualizarLancamentoRequest;
import dev.bstk.wfinance.lancamento.api.request.NovoLancamentoRequest;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepository;
import dev.bstk.wfinance.pessoa.domain.PessoaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import static dev.bstk.wfinance.lancamento.api.LancamentoMapper.entidade;

@Service
public class LancamentoService {

    private final PessoaRepository pessoaRepository;
    private final CategoriaRepository categoriaRepository;
    private final LancamentoRepository lancamentoRepository;

    @Autowired
    public LancamentoService(final PessoaRepository pessoaRepository,
                             final CategoriaRepository categoriaRepository,
                             final LancamentoRepository lancamentoRepository) {
        this.pessoaRepository = pessoaRepository;
        this.categoriaRepository = categoriaRepository;
        this.lancamentoRepository = lancamentoRepository;
    }

    public Lancamento novoLancamento(final NovoLancamentoRequest request) {
        final var pessoaOptional = pessoaRepository.findById(request.getPessoa().getId());

        if (pessoaOptional.isEmpty()) {
            throw new DadosInvalidosException(
                "Pessoa.Id", Long.toString(request.getPessoa().getId()), "Pessoa não cadastrada");
        }

        final var pessoa = pessoaOptional.get();

        if (!pessoa.isAtivo()) {
            throw new DadosInvalidosException(
                "Pessoa.Ativo", Boolean.toString(pessoa.isAtivo()), "Pessoa inativa no sistema");
        }

        if (!categoriaRepository.existeCategoriaCadastrada(request.getCategoria().getId())) {
            throw new DadosInvalidosException(
                "Categoria.Id", Long.toString(request.getCategoria().getId()), "Categoria não cadastrada");
        }

        final var lancamento = entidade(request);
        return lancamentoRepository.save(lancamento);
    }

    public Lancamento atualizarLancamento(final Long id, final AtualizarLancamentoRequest request) {
        final var lancamentoOptional = lancamentoRepository.findById(id);

        if (lancamentoOptional.isEmpty()) {
            throw new DadosInvalidosException("Lancamento.Id",
                String.valueOf(id), "Lançamento não encontrado");
        }

        final var categoriaOptional = categoriaRepository.findById(request.getCategoria().getId());

        if (categoriaOptional.isEmpty()) {
            throw new DadosInvalidosException("Lancamento.categoria",
                String.valueOf(request.getCategoria().getId()), "Categoria não cadastrada");
        }

        final var pessoaOptional = pessoaRepository.findById(request.getPessoa().getId());

        if (pessoaOptional.isEmpty()) {
            throw new DadosInvalidosException("Lancamento.pesssoa",
                String.valueOf(request.getPessoa().getId()), "Pessoa não cadastrada");
        }

        boolean pessoaAtiva = pessoaOptional.get().isAtivo();

        if (Boolean.FALSE.equals(pessoaAtiva)) {
            throw new DadosInvalidosException("Lancamento.pesssoa.isAtivo",
                Boolean.toString(pessoaAtiva), "Pessoa não cadastrada");
        }

        final var lancamento = entidade(request, id);
        return lancamentoRepository.save(lancamento);
    }
}
