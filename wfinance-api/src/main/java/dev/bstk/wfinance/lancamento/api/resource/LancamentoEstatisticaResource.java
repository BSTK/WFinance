package dev.bstk.wfinance.lancamento.api.resource;

import dev.bstk.wfinance.lancamento.api.response.LancamentoEstatisticaPorCategoriaResponse;
import dev.bstk.wfinance.lancamento.api.response.LancamentoEstatisticaPorDiaResponse;
import dev.bstk.wfinance.lancamento.api.response.LancamentoEstatisticaPorPessoaResponse;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorCategoria;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorDia;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorPessoa;
import dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static dev.bstk.wfinance.core.Mapper.map;

@RestController
@RequestMapping("/api/v1/lancamentos/estatisticas")
public class LancamentoEstatisticaResource {

    private final LancamentoRepository lancamentoRepository;

    @Autowired
    public LancamentoEstatisticaResource(final LancamentoRepository lancamentoRepository) {
        this.lancamentoRepository = lancamentoRepository;
    }

    @GetMapping("/por-pessoa")
    @PreAuthorize("hasRole('ROLE_PESQUISAR_LANCAMENTO') and #oauth2.hasScope('read')")
    public ResponseEntity<List<LancamentoEstatisticaPorPessoaResponse>> estatisticasPorPessoa() {
        final var estatisticaPorPessoaResponse = new ArrayList<LancamentoEstatisticaPorPessoaResponse>();
        final var estatisticaPorPessoa = lancamentoRepository.porPessoa(LocalDate.now());

        for (LancamentoEstatisticaPorPessoa estatistica : estatisticaPorPessoa) {
            estatisticaPorPessoaResponse.add(map(estatistica, LancamentoEstatisticaPorPessoaResponse.class));
        }

        return ResponseEntity.ok(estatisticaPorPessoaResponse);
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
