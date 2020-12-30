package dev.bstk.wfinance.pessoa.api;

import dev.bstk.wfinance.core.evento.NovoRecursoCriadoEvento;
import dev.bstk.wfinance.pessoa.api.request.EnderecoRequest;
import dev.bstk.wfinance.pessoa.api.request.NovaPessoaRequest;
import dev.bstk.wfinance.pessoa.api.response.PessoaResponse;
import dev.bstk.wfinance.pessoa.api.response.PessoaResumoResponse;
import dev.bstk.wfinance.pessoa.domain.PessoaService;
import dev.bstk.wfinance.pessoa.domain.repository.PessoaRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import java.util.List;

import static dev.bstk.wfinance.pessoa.PessoaMapper.response;
import static dev.bstk.wfinance.pessoa.PessoaMapper.resumo;

@Slf4j
@RestController
@RequestMapping("/api/v1/pessoas")
public class PessoaResource {

    private final PessoaService pessoaService;
    private final PessoaRepository pessoaRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    public PessoaResource(final PessoaService pessoaService,
                          final PessoaRepository pessoaRepository,
                          final ApplicationEventPublisher applicationEventPublisher) {
        this.pessoaService = pessoaService;
        this.pessoaRepository = pessoaRepository;
        this.applicationEventPublisher =applicationEventPublisher;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_PESQUISAR_PESSOA') and #oauth2.hasScope('read')")
    public ResponseEntity<Page<PessoaResponse>> pessoas(@RequestParam(value = "nome", defaultValue = "", required = false)
                                                        final String nome,
                                                        final Pageable pageable) {
        final var pessoas = pessoaService.pessoas(nome, pageable);
        final var pessoasResponse = response(pessoas);
        return ResponseEntity.ok(pessoasResponse);
    }

    @GetMapping("/resumo")
    @PreAuthorize("hasRole('ROLE_PESQUISAR_PESSOA') and #oauth2.hasScope('read')")
    public ResponseEntity<List<PessoaResumoResponse>> pessoas() {
        final var pessoas = pessoaRepository.findAll();
        final var pessoasResponse = resumo(pessoas);
        return ResponseEntity.ok(pessoasResponse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_PESQUISAR_PESSOA') and #oauth2.hasScope('read')")
    public ResponseEntity<PessoaResponse> pessoaPorId(@PathVariable("id") final Long id) {
        final var pessoaOptional = pessoaRepository.findById(id);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            final var pessoaResponse = response(pessoa);
            return ResponseEntity.ok(pessoaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ROLE_CADASTRAR_PESSOA') and #oauth2.hasScope('write')")
    public ResponseEntity<PessoaResponse> novaPessoa(@RequestBody @Valid final NovaPessoaRequest request,
                                                     final HttpServletResponse httpServletResponse) {
        final var pessoaSalva = pessoaService.novaPessoa(request);
        final var pessoaSalvaResponse = response(pessoaSalva);

        applicationEventPublisher.publishEvent(new NovoRecursoCriadoEvento(
            this, httpServletResponse, pessoaSalva.getId()));

        return ResponseEntity.ok(pessoaSalvaResponse);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_CADASTRAR_PESSOA') and #oauth2.hasScope('write')")
    public ResponseEntity<PessoaResponse> atualizar(@PathVariable("id") final Long id,
                                                    @RequestBody @Valid final NovaPessoaRequest request) {
        final var pessoaOptional = pessoaService.atualizar(id, request);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            final var pessoaResponse = response(pessoa);
            return ResponseEntity.ok(pessoaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/endereco")
    @PreAuthorize("hasRole('ROLE_CADASTRAR_PESSOA') and #oauth2.hasScope('write')")
    public ResponseEntity<PessoaResponse> atualizarEndereco(@PathVariable("id") final Long id,
                                                            @RequestBody @Valid final EnderecoRequest request) {
        final var pessoaOptional = pessoaService.atualizarEndereco(id, request);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            final var pessoaSalvaResponse = response(pessoa);
            return ResponseEntity.ok(pessoaSalvaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PutMapping("/{id}/ativo")
    @PreAuthorize("hasRole('ROLE_CADASTRAR_PESSOA') and #oauth2.hasScope('write')")
    public ResponseEntity<PessoaResponse> atualizarAtivo(@PathVariable("id") final Long id,
                                                         @RequestBody final Boolean ativo) {
        final var pessoaOptional = pessoaService.atualizarAtivo(id,ativo);

        if (pessoaOptional.isPresent()) {
            final var pessoa = pessoaOptional.get();
            final var pessoaSalvaResponse = response(pessoa);
            return ResponseEntity.ok(pessoaSalvaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_REMOVER_PESSOA') and #oauth2.hasScope('write')")
    public ResponseEntity<Void> excluir(@PathVariable("id") final Long pesssoaId) {
        pessoaService.excluir(pesssoaId);
        return ResponseEntity.noContent().build();
    }
}
