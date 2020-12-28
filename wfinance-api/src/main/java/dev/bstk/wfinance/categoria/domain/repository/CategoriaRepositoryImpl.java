package dev.bstk.wfinance.categoria.domain.repository;

import dev.bstk.wfinance.categoria.domain.Categoria;
import org.apache.commons.collections4.CollectionUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.Arrays;
import java.util.Objects;

public class CategoriaRepositoryImpl implements CategoriaRepositoryQuery {

    private final String QUERY_PARAM_NOME = "nome";
    private final String QUERY_CLAUSURA_WHERE = "WHERE";
    private final String QUERY_COUNT = "SELECT count(*) FROM Categoria c ";
    private final String QUERY_FILTRO = "SELECT c FROM Categoria c WHERE UPPER(c.nome) LIKE CONCAT(UPPER(:nome), '%') ";

    @PersistenceContext
    private EntityManager manager;

    @Override
    public Page<Categoria> filtar(final Pageable pageable, final String nome) {
        final var query = manager.createQuery(QUERY_FILTRO, Categoria.class);
        return executar(query, pageable, nome);
    }

    private <T> Page<T> executar(final Query query, final Pageable pageable, final String nome) {
        final var totalRegistrosPorPagina = pageable.getPageSize();
        final var totalRegistros = calcularTotalRegistros(nome);
        final var primeiraPgaina = pageable.getPageNumber() * pageable.getPageSize();

        query.setParameter(QUERY_PARAM_NOME, parametro(nome));
        query.setFirstResult(primeiraPgaina);
        query.setMaxResults(totalRegistrosPorPagina);

        final var resultado = query.getResultList();

        return new PageImpl<>(resultado, pageable, totalRegistros);
    }

    private Long calcularTotalRegistros(final String nome) {
        final var where = Arrays.asList(QUERY_FILTRO.split(QUERY_CLAUSURA_WHERE));

        if (CollectionUtils.isNotEmpty(where)) {
            final Query queryCount = where.size() == 1
                ? manager.createQuery(QUERY_COUNT, Long.class)
                : manager.createQuery(QUERY_COUNT.concat(QUERY_CLAUSURA_WHERE) + where.get(1), Long.class);

            queryCount.setParameter(QUERY_PARAM_NOME, parametro(nome));

            return (Long) queryCount.getSingleResult();
        }

        return 0L;
    }

    private Object parametro(final Object o) {
        return Objects.nonNull(o) ? o : "";
    }

}
