package dev.bstk.wfinance.pessoa.domain.repository;

import dev.bstk.wfinance.core.repository.AbstractRepositoryQuery;
import dev.bstk.wfinance.pessoa.domain.entidade.Pessoa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public class PessoaRepositoryImpl extends AbstractRepositoryQuery implements PessoaRepositoryQuery {

    private static final String QUERY_PARAM = "nome";
    private static final String QUERY_COUNT = "SELECT count(*) FROM Pessoa p ";
    private static final String QUERY_FILTRO = "SELECT p FROM Pessoa p WHERE UPPER(p.nome) LIKE UPPER(CONCAT(:nome, '%')) ";

    @Override
    public Page<Pessoa> filtar(final Pageable pageable, final String nome) {
        final var query = manager.createQuery(QUERY_FILTRO, Pessoa.class);
        return executar(query, pageable, Map.of(QUERY_PARAM, nome));
    }

    @Override
    public String queryCount() {
        return QUERY_COUNT;
    }

    @Override
    public String queryFiltro() {
        return QUERY_FILTRO;
    }

}
