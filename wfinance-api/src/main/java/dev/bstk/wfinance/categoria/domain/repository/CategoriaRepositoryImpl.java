package dev.bstk.wfinance.categoria.domain.repository;

import dev.bstk.wfinance.categoria.domain.entidade.Categoria;
import dev.bstk.wfinance.core.repository.AbstractRepositoryQuery;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public class CategoriaRepositoryImpl extends AbstractRepositoryQuery implements CategoriaRepositoryQuery {

    private static final String QUERY_PARAM = "nome";
    private static final String QUERY_COUNT = "SELECT count(*) FROM Categoria c ";
    private static final String QUERY_FILTRO = "SELECT c FROM Categoria c WHERE UPPER(c.nome) LIKE CONCAT(UPPER(:nome), '%') ";

    @Override
    public Page<Categoria> filtar(final Pageable pageable, final String nome) {
        final var query = manager.createQuery(QUERY_FILTRO, Categoria.class);
        return executar(query, pageable, Map.of(QUERY_PARAM, nome));
    }

    @Override
    public String queryCount() {
        return QUERY_COUNT;
    }

}
