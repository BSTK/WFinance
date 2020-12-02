package dev.bstk.wfinance.lancamento.api;

import dev.bstk.wfinance.core.evento.NovoRecursoCriadoEvento;
import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import dev.bstk.wfinance.lancamento.api.request.NovoLancamentoRequest;
import dev.bstk.wfinance.lancamento.api.response.LancamentoResponse;
import dev.bstk.wfinance.lancamento.api.response.ResumoLancamentoResponse;
import dev.bstk.wfinance.lancamento.domain.LancamentoService;
import dev.bstk.wfinance.lancamento.domain.projecao.ResumoLancamento;
import dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.ArrayList;
import java.util.List;

import static dev.bstk.wfinance.core.Mapper.map;
import static dev.bstk.wfinance.lancamento.api.LancamentoMapper.response;
import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

@RestController
@RequestMapping("/api/v1/lancamentos")
public class LancamentoResource {

    private final LancamentoService lancamentoService;
    private final LancamentoRepository lancamentoRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    public LancamentoResource(final LancamentoService lancamentoService,
                              final LancamentoRepository lancamentoRepository,
                              final ApplicationEventPublisher applicationEventPublisher) {
        this.lancamentoService = lancamentoService;
        this.lancamentoRepository = lancamentoRepository;
        this.applicationEventPublisher = applicationEventPublisher;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<Page<LancamentoResponse>> lancamentos(final Pageable pageable,
                                                                final LancamentoFiltroRequest request) {
        final var lancamentos = lancamentoRepository.filtar(pageable, request);
        final var lancamentosResponse = response(lancamentos);
        return ResponseEntity.ok(lancamentosResponse);
    }

    @GetMapping("/resumo")
    @PreAuthorize("hasRole('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<Page<ResumoLancamentoResponse>> resumo(final Pageable pageable,
                                                                 final LancamentoFiltroRequest request) {
        Page<ResumoLancamento> pageresumoLancamentos = lancamentoRepository.resumo(pageable, request);
        List<ResumoLancamento> resumoLancamentos = pageresumoLancamentos.getContent();

        List<ResumoLancamentoResponse> dados = new ArrayList<>();

        for (ResumoLancamento resumoLancamento : resumoLancamentos) {
            ResumoLancamentoResponse response = map(resumoLancamento, ResumoLancamentoResponse.class);
            response.setCategoria(resumoLancamento.getCategoria());
            response.setPessoa(resumoLancamento.getPessoa());
            dados.add(response);
        }

        final var pageImpl = new PageImpl<>(dados,
            pageresumoLancamentos.getPageable(),
            dados.size());

        return ResponseEntity.ok(pageImpl);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<LancamentoResponse> lancamentos(@PathVariable("id") final Long id) {
        final var lancamentoOptional = lancamentoRepository.findById(id);

        if (lancamentoOptional.isPresent()) {
            final var lancamento = lancamentoOptional.get();
            final var lancamentoResponse = response(lancamento);
            return ResponseEntity.ok(lancamentoResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/categoria/{id}")
    @PreAuthorize("hasRole('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<List<LancamentoResponse>> lancamentosPorCategoria(@PathVariable("id") final Long id) {
        final var lancamentos = lancamentoRepository.lancamentosPorCategoria(id);

        if (isNotEmpty(lancamentos)) {
            final var lancamentosResponse = response(lancamentos);
            return ResponseEntity.ok(lancamentosResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/pessoa/{id}")
    @PreAuthorize("hasRole('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<List<LancamentoResponse>> lancamentosPorPessoa(@PathVariable("id") final Long id) {
        final var lancamentos = lancamentoRepository.lancamentosPorPessoa(id);

        if (isNotEmpty(lancamentos)) {
            final var lancamentosResponse = response(lancamentos);
            return ResponseEntity.ok(lancamentosResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasRole('ROLE_CADASTRAR_LANCAMENTO') and #oauth2.hasScope('write')")
    public ResponseEntity<LancamentoResponse> novoLancamento(@RequestBody @Valid final NovoLancamentoRequest request,
                                                             final HttpServletResponse httpServletResponse) {
        final var lancamentoSalvo = lancamentoService.novoLancamento(request);
        final var lancamentoResponse = response(lancamentoSalvo);

        applicationEventPublisher.publishEvent(new NovoRecursoCriadoEvento(
            this, httpServletResponse, lancamentoSalvo.getId()));

        return ResponseEntity.ok(lancamentoResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_REMOVER_LANCAMENTO') and #oauth2.hasScope('write')")
    public ResponseEntity<Void> excluir(@PathVariable("id") final Long id) {
        lancamentoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
