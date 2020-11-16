package dev.bstk.wfinance.lancamento.domain;

import dev.bstk.wfinance.categoria.domain.CategoriaRepository;
import dev.bstk.wfinance.lancamento.api.request.NovoLancamentoRequest;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import dev.bstk.wfinance.pessoa.domain.PessoaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
public class LancamentoService {

    private final ModelMapper mapper;
    private final PessoaRepository pessoaRepository;
    private final CategoriaRepository categoriaRepository;
    private final LancamentoRepository lancamentoRepository;

    @Autowired
    public LancamentoService(final ModelMapper mapper,
                             final PessoaRepository pessoaRepository,
                             final CategoriaRepository categoriaRepository,
                             final LancamentoRepository lancamentoRepository) {
        this.mapper = mapper;
        this.pessoaRepository = pessoaRepository;
        this.categoriaRepository = categoriaRepository;
        this.lancamentoRepository = lancamentoRepository;
    }

    public Lancamento novoLancamento(final NovoLancamentoRequest request) {

        final var pessoa = pessoaRepository.getOne(request.getPessoa().getId());

        if (Objects.isNull(pessoa)) {
            /// TODO: VALIDAR SE EXISTE A PESSOA CADASTRADA PARA ESTE LANÇAMENTO
            /// TODO: LANÇAR EXCEÇÃO GENERICA DE DADOS INVALIDOS
            /// TODO: COM MSG: PESSOA NÃO CADASTRADA
        }

        if (!pessoa.isAtivo()) {
            /// TODO: LANÇAR EXCEÇÃO GENERICA DE DADOS INVALIDOS
            /// TODO: COM MSG: PESSOA INATIVA NO SISTEMA
        }

        if (!categoriaRepository.existeCategoriaCadastrada(request.getCategoria().getId())) {
            /// TODO: VALIDAR SE EXISTE A CATEGORIA CADASTRADA PARA ESTE LANÇAMENTO
            /// TODO: LANÇAR EXCEÇÃO GENERICA DE DADOS INVALIDOS
            /// TODO: COM MSG: CATEGORIA NÃO CADASTRADA
        }

        final var lancamento = mapper.map(request, Lancamento.class);

        return lancamentoRepository.save(lancamento);
    }

}
