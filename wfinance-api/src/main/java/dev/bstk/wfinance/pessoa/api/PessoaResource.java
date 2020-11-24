package dev.bstk.wfinance.pessoa.api;

import dev.bstk.wfinance.core.evento.NovoRecursoCriadoEvento;
import dev.bstk.wfinance.pessoa.api.request.EnderecoRequest;
import dev.bstk.wfinance.pessoa.api.request.NovaPessoaRequest;
import dev.bstk.wfinance.pessoa.api.response.PessoaResponse;
import dev.bstk.wfinance.pessoa.domain.PessoaRepository;
import dev.bstk.wfinance.pessoa.domain.PessoaService;
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
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/v1/pessoas")
public class PessoaResource {

    private final ModelMapper mapper;
    private final PessoaService pessoaService;
    private final PessoaRepository pessoaRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    public PessoaResource(final ModelMapper mapper,
                          final PessoaService pessoaService,
                          final PessoaRepository pessoaRepository,
                          final ApplicationEventPublisher applicationEventPublisher) {
        this.mapper = mapper;
        this.pessoaService = pessoaService;
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
        final var pessoaSalva = pessoaService.novaPessoa(request);
        final var pessoaSalvaResponse = mapper.map(pessoaSalva, PessoaResponse.class);

        applicationEventPublisher.publishEvent(new NovoRecursoCriadoEvento(
            this, httpServletResponse, pessoaSalva.getId()));

        return ResponseEntity.ok(pessoaSalvaResponse);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PessoaResponse> atualizar(@PathVariable("id") final Long id,
                                                    @RequestBody @Valid final NovaPessoaRequest request) {
        final var pessoaOptional = pessoaService.atualizar(id, request);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            final var pessoaResponse = mapper.map(pessoa, PessoaResponse.class);
            return ResponseEntity.ok(pessoaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/endereco")
    public ResponseEntity<PessoaResponse> atualizarEndereco(@PathVariable("id") final Long id,
                                                            @RequestBody @Valid final EnderecoRequest request) {
        final var pessoaOptional = pessoaService.atualizarEndereco(id, request);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            final var pessoaSalvaResponse = mapper.map(pessoa, PessoaResponse.class);
            return ResponseEntity.ok(pessoaSalvaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/ativo")
    public ResponseEntity<PessoaResponse> atualizarAtivo(@PathVariable("id") final Long id,
                                                         @RequestBody final Boolean ativo) {
        final var pessoaOptional = pessoaService.atualizarAtivo(id,ativo);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            final var pessoaSalvaResponse = mapper.map(pessoa, PessoaResponse.class);
            return ResponseEntity.ok(pessoaSalvaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable("id") final Long id) {
        pessoaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
