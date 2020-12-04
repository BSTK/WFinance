package dev.bstk.wfinance.pessoa.domain;

import dev.bstk.wfinance.pessoa.api.request.EnderecoRequest;
import dev.bstk.wfinance.pessoa.api.request.NovaPessoaRequest;
import dev.bstk.wfinance.pessoa.domain.entidade.Endereco;
import dev.bstk.wfinance.pessoa.domain.entidade.Pessoa;
import dev.bstk.wfinance.pessoa.domain.validacao.ValidarCadastroDeEndereco;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

import static dev.bstk.wfinance.core.Mapper.map;
import static dev.bstk.wfinance.pessoa.PessoaMapper.entidade;

@Service
public class PessoaService {

    private final PessoaRepository pessoaRepository;
    private final ValidarCadastroDeEndereco validarCadastroDeEndereco;

    @Autowired
    public PessoaService(final PessoaRepository pessoaRepository,
                         final ValidarCadastroDeEndereco validarCadastroDeEndereco) {
        this.pessoaRepository = pessoaRepository;
        this.validarCadastroDeEndereco = validarCadastroDeEndereco;
    }

    public List<Pessoa> pessoas(final String nome) {
        return nome.isEmpty()
            ? pessoaRepository.findAll()
            : pessoaRepository.buscarPorNome(nome);
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

}
