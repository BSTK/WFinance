package dev.bstk.wfinance.pessoa.api;

import dev.bstk.wfinance.core.evento.NovoRecursoCriadoEvento;
import dev.bstk.wfinance.pessoa.api.request.NovaPessoaRequest;
import dev.bstk.wfinance.pessoa.api.response.PessoaResponse;
import dev.bstk.wfinance.pessoa.domain.Pessoa;
import dev.bstk.wfinance.pessoa.domain.PessoaRepository;
import dev.bstk.wfinance.pessoa.domain.exception.EnderecoJaCadastradoException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/v1/pessoas")
public class PessoaResource {

    private final ModelMapper mapper;
    private final PessoaRepository pessoaRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    public PessoaResource(final ModelMapper mapper,
                          final PessoaRepository pessoaRepository,
                          final ApplicationEventPublisher applicationEventPublisher) {
        this.mapper = mapper;
        this.pessoaRepository = pessoaRepository;
        this.applicationEventPublisher =applicationEventPublisher;
    }

    @GetMapping
    public ResponseEntity<List<PessoaResponse>> pessoas() {
        final var pessoas = pessoaRepository.findAll();
        final var pessoasResponse = pessoas.stream()
            .map(pessoa -> mapper.map(pessoa, PessoaResponse.class))
            .collect(Collectors.toList());

        return ResponseEntity.ok(pessoasResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PessoaResponse> pessoaPorId(@PathVariable("id") final Long id) {
        final var pessoaOptional = pessoaRepository.findById(id);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            final var pessoaResponse = mapper.map(pessoa, PessoaResponse.class);
            return ResponseEntity.ok(pessoaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<PessoaResponse> novaPessoa(@RequestBody @Valid final NovaPessoaRequest request,
                                                     final HttpServletResponse httpServletResponse) {

        if (Objects.nonNull(request)) {
            /// TODO: SE ENDEREÇO FOR INFORMADO, ENTÃO TODOS OS CAMPOS DEVEM SER INFORMADOS MENOS "complemento"
        }

        if (Objects.nonNull(request)) {
            final var endereco = request.getEndereco();
            final var existeEnderecoCadastrado = pessoaRepository.existeEnderecoCadastrado(endereco.getCep(),
                                                                                           endereco.getLogradouro(),
                                                                                           endereco.getNumero());

            if (existeEnderecoCadastrado) {
                log.warn("Já existe uma pessoa cadastrada com este endereco. Dados: Cep: {}, Logradouro: {}, Numero: {}",
                    endereco.getCep(), endereco.getLogradouro(), endereco.getNumero());
                throw new EnderecoJaCadastradoException("Já existe uma pessoa cadastrada com este endereco.");
            }
        }

        final var novaPessoa = mapper.map(request, Pessoa.class);
        final var pessoaSalva = pessoaRepository.save(novaPessoa);
        final var pessoaSalvaResponse = mapper.map(pessoaSalva, PessoaResponse.class);

        applicationEventPublisher.publishEvent(new NovoRecursoCriadoEvento(
            this, httpServletResponse, pessoaSalva.getId()));

        return ResponseEntity.ok(pessoaSalvaResponse);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") final Long id) {
        pessoaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
