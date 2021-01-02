package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import dev.bstk.wfinance.lancamento.domain.projecao.ResumoLancamento;
import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static dev.bstk.wfinance.core.helper.StringHelper.orEmpty;
import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryQueryConstants.QUERY_COUNT;
import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryQueryFormatadorSql.queryFiltro;
import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryQueryFormatadorSql.queryResumo;

/// TODO: REFATORAR PARA USO ABSTRACT
public class LancamentoRepositoryQueryImpl implements LancamentoRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    private static final String QUERY_CLAUSURA_WHERE = "WHERE";

    @Override
    public Page<Lancamento> filtar(final Pageable pageable,
                                   final LancamentoFiltroRequest request) {
        final var qlString = queryFiltro(request);
        final var query = manager.createQuery(qlString, Lancamento.class);
        return executar(query, qlString, pageable, request);
    }

    /// TODO: REFATORAR PARA USO ABSTRACT
    @Override
    public Page<ResumoLancamento> resumo(final Pageable pageable,
                                         final LancamentoFiltroRequest request) {
        final var qlString = queryResumo(request);
        final var query = manager.createQuery(qlString);
        return executar(query, qlString, pageable, request);
    }

    /// TODO: REFATORAR PARA USO ABSTRACT
    private <T> Page<T> executar(final Query query,
                                 final String qlString,
                                 final Pageable pageable,
                                 final LancamentoFiltroRequest request) {
        filtroMap(request).forEach((k, v) -> {
            if (StringUtils.isNotEmpty(v.toString())) {
                query.setParameter(k, v);
            }
        });

        final var totalRegistrosPorPagina = pageable.getPageSize();
        final var totalRegistros = calcularTotalRegistros(qlString, request);
        final var primeiraPgaina = pageable.getPageNumber() * pageable.getPageSize();

        query.setFirstResult(primeiraPgaina);
        query.setMaxResults(totalRegistrosPorPagina);

        final var resultado = query.getResultList();

        return new PageImpl<>(resultado, pageable, totalRegistros);
    }

    /// TODO: REFATORAR PARA O USO DO ABSTRACT
    private Long calcularTotalRegistros(final String qlString,
                                        final LancamentoFiltroRequest request) {
        final var where = Arrays.asList(qlString.split(QUERY_CLAUSURA_WHERE));

        if (CollectionUtils.isNotEmpty(where)) {
            final Query queryCount = where.size() == 1
                ? manager.createQuery(QUERY_COUNT, Long.class)
                : manager.createQuery(QUERY_COUNT.concat(QUERY_CLAUSURA_WHERE) + where.get(1), Long.class);

            filtroMap(request).forEach((k, v) -> {
                if (StringUtils.isNotEmpty(v.toString())) {
                    queryCount.setParameter(k, v);
                }
            });

            return (Long) queryCount.getSingleResult();
        }

        return 0L;
    }

    private Map<String, Object> filtroMap(final LancamentoFiltroRequest request) {
        final var parametos = new HashMap<String, Object>();
        parametos.put("descricao", orEmpty(request.getDescricao()));
        parametos.put("dataVencimentoDe", orEmpty(request.getDataVencimentoDe()));
        parametos.put("dataVencimentoAte", orEmpty(request.getDataVencimentoAte()));

        return parametos;
    }

}
