package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import org.apache.commons.lang3.StringUtils;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryQueryFormatadorSQL.formatarQuery;

public class LancamentoRepositoryQueryImpl implements LancamentoRepositoryQuery {

    @PersistenceContext
    private EntityManager manager;

    @Override
    public List<Lancamento> filtar(final LancamentoFiltroRequest request) {
        final var qlString = formatarQuery(request);
        final var query = manager.createQuery(qlString, Lancamento.class);

        filtroMap(request).forEach((k, v) -> {
            if (StringUtils.isNotEmpty(v.toString())) {
                query.setParameter(k, v);
            }
        });

        return query.getResultList();
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
