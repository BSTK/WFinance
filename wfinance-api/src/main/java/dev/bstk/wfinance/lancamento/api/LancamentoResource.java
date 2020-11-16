package dev.bstk.wfinance.lancamento.api;

import dev.bstk.wfinance.core.evento.NovoRecursoCriadoEvento;
import dev.bstk.wfinance.lancamento.api.request.NovoLancamentoRequest;
import dev.bstk.wfinance.lancamento.api.response.LancamentoResponse;
import dev.bstk.wfinance.lancamento.domain.LancamentoRepository;
import dev.bstk.wfinance.lancamento.domain.LancamentoService;
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

import static org.apache.commons.collections4.CollectionUtils.isNotEmpty;

@RestController
@RequestMapping("/api/v1/lancamentos")
public class LancamentoResource {

    private final ModelMapper mapper;
    private final LancamentoService lancamentoService;
    private final LancamentoRepository lancamentoRepository;

    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    public LancamentoResource(final ModelMapper mapper,
                              final LancamentoService lancamentoService,
                              final LancamentoRepository lancamentoRepository,
                              final ApplicationEventPublisher applicationEventPublisher) {
        this.mapper = mapper;
        this.lancamentoService = lancamentoService;
        this.lancamentoRepository = lancamentoRepository;
        this.applicationEventPublisher = applicationEventPublisher;
    }

    @GetMapping
    public ResponseEntity<List<LancamentoResponse>> lancamentos() {
        final var lancamentos = lancamentoRepository.findAll();
        final var lancamentosResponse = lancamentos.stream()
            .map(lancamento -> mapper.map(lancamento, LancamentoResponse.class))
            .collect(Collectors.toList());

        return ResponseEntity.ok(lancamentosResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<LancamentoResponse> lancamentos(@PathVariable("id") final Long id) {
        final var lancamentoOptional = lancamentoRepository.findById(id);

        if (lancamentoOptional.isPresent()) {
            final var lancamento = lancamentoOptional.get();
            final var lancamentoResponse = mapper.map(lancamento, LancamentoResponse.class);
            return ResponseEntity.ok(lancamentoResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/categoria/{id}")
    public ResponseEntity<List<LancamentoResponse>> lancamentosPorCategoria(@PathVariable("id") final Long id) {
        final var lancamentos = lancamentoRepository.lancamentosPorCategoria(id);

        if (isNotEmpty(lancamentos)) {
            final var lancamentosResponse = lancamentos.stream()
                .map(lancamento -> mapper.map(lancamento, LancamentoResponse.class))
                .collect(Collectors.toList());

            return ResponseEntity.ok(lancamentosResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @GetMapping("/pessoa/{id}")
    public ResponseEntity<List<LancamentoResponse>> lancamentosPorPessoa(@PathVariable("id") final Long id) {
        final var lancamentos = lancamentoRepository.lancamentosPorPessoa(id);

        if (isNotEmpty(lancamentos)) {
            final var lancamentosResponse = lancamentos.stream()
                .map(lancamento -> mapper.map(lancamento, LancamentoResponse.class))
                .collect(Collectors.toList());

            return ResponseEntity.ok(lancamentosResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<LancamentoResponse> novoLancamento(@RequestBody @Valid final NovoLancamentoRequest request,
                                                             final HttpServletResponse httpServletResponse) {

        final var lancamento = lancamentoService.novoLancamento(request);
        final var lancamentoSalvo = lancamentoRepository.save(lancamento);
        final var lancamentoResponse = mapper.map(lancamentoSalvo, LancamentoResponse.class);

        applicationEventPublisher.publishEvent(new NovoRecursoCriadoEvento(
            this, httpServletResponse, lancamentoSalvo.getId()));

        return ResponseEntity.ok(lancamentoResponse);
    }
}
