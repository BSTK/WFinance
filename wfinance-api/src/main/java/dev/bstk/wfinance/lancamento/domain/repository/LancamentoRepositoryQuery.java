package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorCategoria;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorDia;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorPessoa;
import dev.bstk.wfinance.lancamento.domain.projecao.ResumoLancamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

public interface LancamentoRepositoryQuery {

    List<LancamentoEstatisticaPorDia> porDia(final LocalDate mesReferencia);

    List<LancamentoEstatisticaPorCategoria> porCategoria(final LocalDate mesReferencia);

    List<LancamentoEstatisticaPorPessoa> porPessoa(final LocalDate inicio, final LocalDate fim);

    Page<Lancamento> filtar(final Pageable pageable, final LancamentoFiltroRequest request);

    Page<ResumoLancamento> resumo(final Pageable pageable, final LancamentoFiltroRequest request);
}
