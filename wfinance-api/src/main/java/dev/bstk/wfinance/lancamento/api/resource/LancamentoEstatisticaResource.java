package dev.bstk.wfinance.lancamento.api.resource;

import dev.bstk.wfinance.lancamento.api.response.LancamentoEstatisticaPorCategoriaResponse;
import dev.bstk.wfinance.lancamento.api.response.LancamentoEstatisticaPorDiaResponse;
import dev.bstk.wfinance.lancamento.domain.LancamentoService;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorCategoria;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorDia;
import dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static dev.bstk.wfinance.core.Mapper.map;
import static dev.bstk.wfinance.core.helper.Constantes.FormatoData.DD_MM_YYYY;

@RestController
@RequestMapping("/api/v1/lancamentos/estatisticas")
public class LancamentoEstatisticaResource {

    private final LancamentoService lancamentoService;
    private final LancamentoRepository lancamentoRepository;

    @Autowired
    public LancamentoEstatisticaResource(final LancamentoService lancamentoService,
                                         final LancamentoRepository lancamentoRepository) {
        this.lancamentoService = lancamentoService;
        this.lancamentoRepository = lancamentoRepository;
    }

    @GetMapping("/por-pessoa")
    @PreAuthorize("hasRole('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<byte[]> estatisticasPorPessoa(
        @RequestParam("inicio") @DateTimeFormat(pattern = DD_MM_YYYY) final LocalDate inicio,
        @RequestParam("fim") @DateTimeFormat(pattern = DD_MM_YYYY) final LocalDate fim) {

        final var relatorioPdfNomeArquivo = "attachment; filename=relatorio-de-$DATA_INICIO-a-$DATA_INICIO.pdf";
        final var relatorioPdf = lancamentoService.relatorioEstatisticaPorPessoa(inicio, fim);
        return ResponseEntity.ok()
            .header(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_PDF_VALUE)
            .header(HttpHeaders.CONTENT_DISPOSITION, relatorioPdfNomeArquivo)
            .body(relatorioPdf);
    }

    @GetMapping("/por-categorias")
    @PreAuthorize("hasRole('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<List<LancamentoEstatisticaPorCategoriaResponse>> estatisticasPorCategoria() {
        final var estatisticaPorCategoriasResponse = new ArrayList<LancamentoEstatisticaPorCategoriaResponse>();
        final var estatisticaPorCategorias = lancamentoRepository.porCategoria(LocalDate.now());

        for (LancamentoEstatisticaPorCategoria estatistica : estatisticaPorCategorias) {
            estatisticaPorCategoriasResponse.add(map(estatistica, LancamentoEstatisticaPorCategoriaResponse.class));
        }

        return ResponseEntity.ok(estatisticaPorCategoriasResponse);
    }

    @GetMapping("/por-dia")
    @PreAuthorize("hasRole('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<List<LancamentoEstatisticaPorDiaResponse>> estatisticasPorDia() {
        final var estatisticaPorDiaResponse = new ArrayList<LancamentoEstatisticaPorDiaResponse>();
        final var estatisticaPorDia = lancamentoRepository.porDia(LocalDate.now());

        for (LancamentoEstatisticaPorDia estatistica : estatisticaPorDia) {
            estatisticaPorDiaResponse.add(map(estatistica, LancamentoEstatisticaPorDiaResponse.class));
        }

        return ResponseEntity.ok(estatisticaPorDiaResponse);
    }
}
