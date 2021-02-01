package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.core.repository.AbstractRepositoryQuery;
import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorCategoria;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorDia;
import dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorPessoa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryImplHelper.parametros;
import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryQueryConstants.*;
import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryQueryFormatadorSql.formatarQueryFiltro;

public class LancamentoRepositoryImpl extends AbstractRepositoryQuery implements LancamentoRepositoryQuery {

    private static final String QUERY_PARAM_FIM = "fim";
    private static final String QUERY_PARAM_INICIO = "inicio";
    private static final String QUERY_PARAM_ULTIMO_DIA = "ultimoDia";
    private static final String QUERY_PARAM_PRIMEIRO_DIA = "primeiroDia";

    @Override
    public List<LancamentoEstatisticaPorDia> porDia(final LocalDate mesReferencia) {
        final var query = manager.createQuery(QUERY_ESTATISTICA_DIA, LancamentoEstatisticaPorDia.class);
        query.setParameter(QUERY_PARAM_PRIMEIRO_DIA, mesReferencia.withDayOfMonth(1));
        query.setParameter(QUERY_PARAM_ULTIMO_DIA, mesReferencia.withDayOfMonth(mesReferencia.lengthOfMonth()));

        return query.getResultList();
    }

    @Override
    public List<LancamentoEstatisticaPorPessoa> porPessoa(final LocalDate inicio, final LocalDate fim) {
        final var query = manager.createQuery(QUERY_ESTATISTICA_PESSOA, LancamentoEstatisticaPorPessoa.class);
        query.setParameter(QUERY_PARAM_INICIO, inicio);
        query.setParameter(QUERY_PARAM_FIM, fim);

        return query.getResultList();
    }

    @Override
    public List<LancamentoEstatisticaPorCategoria> porCategoria(final LocalDate mesReferencia) {
        final var query = manager.createQuery(QUERY_ESTATISTICA_CATEGORIA, LancamentoEstatisticaPorCategoria.class);
        query.setParameter(QUERY_PARAM_PRIMEIRO_DIA, mesReferencia.withDayOfMonth(1));
        query.setParameter(QUERY_PARAM_ULTIMO_DIA, mesReferencia.withDayOfMonth(mesReferencia.lengthOfMonth()));

        return query.getResultList();
    }

    @Override
    public Page<Lancamento> filtar(Pageable pageable, LancamentoFiltroRequest request) {
        final var query = manager.createQuery(formatarQueryFiltro(request), Lancamento.class);
        return executar(query, pageable, parametros(request));
    }

    @Override
    public String queryCount() {
        return QUERY_COUNT;
    }

}
