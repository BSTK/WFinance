package dev.bstk.wfinance.pessoa.domain;

import dev.bstk.wfinance.core.exception.DadosInvalidosException;
import dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepository;
import dev.bstk.wfinance.pessoa.api.request.EnderecoRequest;
import dev.bstk.wfinance.pessoa.api.request.NovaPessoaRequest;
import dev.bstk.wfinance.pessoa.domain.entidade.Endereco;
import dev.bstk.wfinance.pessoa.domain.entidade.Pessoa;
import dev.bstk.wfinance.pessoa.domain.repository.PessoaRepository;
import dev.bstk.wfinance.pessoa.domain.validacao.ValidarCadastroDeEndereco;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Optional;

import static dev.bstk.wfinance.core.Mapper.map;
import static dev.bstk.wfinance.pessoa.PessoaMapper.entidade;

@Service
public class PessoaService {

    private final PessoaRepository pessoaRepository;
    private final LancamentoRepository lancamentoRepository;
    private final ValidarCadastroDeEndereco validarCadastroDeEndereco;

    @Autowired
    public PessoaService(final PessoaRepository pessoaRepository,
                         final LancamentoRepository lancamentoRepository,
                         final ValidarCadastroDeEndereco validarCadastroDeEndereco) {
        this.pessoaRepository = pessoaRepository;
        this.lancamentoRepository = lancamentoRepository;
        this.validarCadastroDeEndereco = validarCadastroDeEndereco;
    }

    public Page<Pessoa> pessoas(final String nome, final Pageable pageable) {
        return StringUtils.isEmpty(nome)
            ? pessoaRepository.findAll(pageable)
            : pessoaRepository.filtar(pageable, nome);
    }

    public Pessoa novaPessoa(final NovaPessoaRequest request) {
        validarCadastroDeEndereco.executar(request);
        final var novaPessoa = entidade(request);
        return pessoaRepository.save(novaPessoa);
    }

    public Optional<Pessoa> atualizar(final Long id, final NovaPessoaRequest request) {
        final var pessoaOptional = pessoaRepository.findById(id);

        if (pessoaOptional.isPresent()) {
            final var pessoaAtualizada = entidade(request);
            pessoaAtualizada.setId(id);

            final var pessoaSalva = pessoaRepository.save(pessoaAtualizada);
            return Optional.of(pessoaSalva);
        }

        return Optional.empty();
    }

    public Optional<Pessoa> atualizarEndereco(final Long id, final EnderecoRequest request) {
        final var pessoaOptional = pessoaRepository.findById(id);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            final var endereco = map(request, Endereco.class);
            pessoa.setEndereco(endereco);

            final var pessoaSalva = pessoaRepository.save(pessoa);
            return Optional.of(pessoaSalva);
        }

        return Optional.empty();
    }

    public Optional<Pessoa> atualizarAtivo(final Long id, final Boolean ativo) {
        final var pessoaOptional = pessoaRepository.findById(id);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            pessoa.setAtivo(ativo);

            final var pessoaSalva = pessoaRepository.save(pessoa);
            return Optional.of(pessoaSalva);
        }

        return Optional.empty();
    }

    public void excluir(final Long pesssoaId) {
        final var existeLancamentoCadastrado = lancamentoRepository.existeLancamentoParaPessoa(pesssoaId);

        if (existeLancamentoCadastrado) {
            throw new DadosInvalidosException("Pessoa.Id", pesssoaId,
                "Pessoa não pode ser exluida, pois há um lancamento atrelado!");
        }

        pessoaRepository.deleteById(pesssoaId);
    }

}
