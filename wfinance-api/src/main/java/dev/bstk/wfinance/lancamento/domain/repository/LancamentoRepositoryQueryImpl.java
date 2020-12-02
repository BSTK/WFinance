package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import dev.bstk.wfinance.lancamento.domain.projecao.ResumoLancamento;
import org.apache.commons.lang3.StringUtils;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryQueryFormatadorSql.queryFiltro;
import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryQueryFormatadorSql.queryResumo;

public class LancamentoRepositoryQueryImpl implements LancamentoRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public Page<Lancamento> filtar(final Pageable pageable,
                                   final LancamentoFiltroRequest request) {
        final var qlString = queryFiltro(request);
        final var query = manager.createQuery(qlString, Lancamento.class);
        return executar(query, pageable, request);
    }

    @Override
    public Page<ResumoLancamento> resumo(final Pageable pageable,
                                         final LancamentoFiltroRequest request) {
        final var qlString = queryResumo(request);
        final var query = manager.createQuery(qlString);
        return executar(query, pageable, request);
    }

    private <T> Page<T> executar(final Query query,
                                 final Pageable pageable,
                                 final LancamentoFiltroRequest request) {
        filtroMap(request).forEach((k, v) -> {
            if (StringUtils.isNotEmpty(v.toString())) {
                query.setParameter(k, v);
            }
        });

        final var totalRegistrosPorPagina = pageable.getPageSize();
        final var primeiraPgaina = pageable.getPageNumber() * pageable.getPageSize();

        query.setFirstResult(primeiraPgaina);
        query.setMaxResults(totalRegistrosPorPagina);

        final var resultado = query.getResultList();

        return new PageImpl<>(resultado, pageable, resultado.size());
    }

    private Map<String, Object> filtroMap(final LancamentoFiltroRequest request) {
        final var parametos = new HashMap<String, Object>();
        parametos.put("descricao", parametro(request.getDescricao()));
        parametos.put("dataVencimentoDe", parametro(request.getDataVencimentoDe()));
        parametos.put("dataVencimentoAte", parametro(request.getDataVencimentoAte()));

        return parametos;
    }

    private Object parametro(final Object o) {
        return Objects.nonNull(o) ? o : "";
    }

}
