package dev.bstk.wfinance.pessoa.domain;

import dev.bstk.wfinance.pessoa.api.request.EnderecoRequest;
import dev.bstk.wfinance.pessoa.api.request.NovaPessoaRequest;
import dev.bstk.wfinance.pessoa.domain.entidade.Endereco;
import dev.bstk.wfinance.pessoa.domain.entidade.Pessoa;
import dev.bstk.wfinance.pessoa.domain.validacao.ValidarCadastroDeEndereco;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PessoaService {

    private final ModelMapper mapper;
    private final PessoaRepository pessoaRepository;
    private final ValidarCadastroDeEndereco validarCadastroDeEndereco;

    @Autowired
    public PessoaService(final ModelMapper mapper,
                         final PessoaRepository pessoaRepository,
                         final ValidarCadastroDeEndereco validarCadastroDeEndereco) {
        this.mapper = mapper;
        this.pessoaRepository = pessoaRepository;
        this.validarCadastroDeEndereco = validarCadastroDeEndereco;
    }

    public Pessoa novaPessoa(final NovaPessoaRequest request) {
        validarCadastroDeEndereco.executar(request);

        final var novaPessoa = mapper.map(request, Pessoa.class);
        final var pessoaSalva = pessoaRepository.save(novaPessoa);

        return pessoaSalva;
    }

    public Optional<Pessoa> atualizar(final Long id, final NovaPessoaRequest request) {
        final var pessoaOptional = pessoaRepository.findById(id);

        if (pessoaOptional.isPresent()) {
            final var pessoaAtualizada = mapper.map(request, Pessoa.class);
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
            final var endereco = mapper.map(request, Endereco.class);
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
