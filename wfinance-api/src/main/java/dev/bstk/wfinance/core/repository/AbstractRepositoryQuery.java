package dev.bstk.wfinance.core.repository;

import org.apache.commons.collections4.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Arrays;
import java.util.Map;

public abstract class AbstractRepositoryQuery {

    private static final String QUERY_CLAUSURA_WHERE = "WHERE";

    @PersistenceContext
    protected EntityManager manager;

    protected <T> Page<T> executar(final Query query,
                                   final Pageable pageable,
                                   final Map<String, Object> params) {
        final var totalRegistrosPorPagina = pageable.getPageSize();
        final var totalRegistros = calcularTotalRegistros(params);
        final var primeiraPgaina = pageable.getPageNumber() * pageable.getPageSize();

        params.forEach((k, v) -> {
            if (StringUtils.isNotEmpty(v.toString())) {
                query.setParameter(k, v);
            }
        });

        query.setFirstResult(primeiraPgaina);
        query.setMaxResults(totalRegistrosPorPagina);

        final var resultado = query.getResultList();

        return new PageImpl<>(resultado, pageable, totalRegistros);
    }

    private Long calcularTotalRegistros(final Map<String, Object> params) {
        final var where = Arrays.asList(queryFiltro().split(QUERY_CLAUSURA_WHERE));

        if (CollectionUtils.isNotEmpty(where)) {
            final Query queryCount = where.size() == 1
                ? manager.createQuery(queryCount(), Long.class)
                : manager.createQuery(queryCount().concat(QUERY_CLAUSURA_WHERE) + where.get(1), Long.class);

            params.forEach((k, v) -> {
                if (StringUtils.isNotEmpty(v.toString())) {
                    queryCount.setParameter(k, v);
                }
            });

            return (Long) queryCount.getSingleResult();
        }

        return 0L;
    }

    public abstract String queryCount();

    public abstract String queryFiltro();

}
