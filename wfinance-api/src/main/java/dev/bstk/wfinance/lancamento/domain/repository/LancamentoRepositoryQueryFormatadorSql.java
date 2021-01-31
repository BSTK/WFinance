package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import org.apache.commons.lang3.StringUtils;

import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryQueryConstants.QUERY_FILTRO;
import static dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepositoryQueryConstants.QUERY_RESUMO;
import static java.util.Objects.nonNull;

class LancamentoRepositoryQueryFormatadorSql {

    private LancamentoRepositoryQueryFormatadorSql() {
        throw new AssertionError("Não instanciar LancamentoRepositoryQueryFormatadorSQL");
    }

    static String formatarQueryFiltro(final LancamentoFiltroRequest request) {
        return query(QUERY_FILTRO, request);
    }

    static String formatarQueryResumo(final LancamentoFiltroRequest request) {
        return query(QUERY_RESUMO, request);
    }

    private static String query(String query, final LancamentoFiltroRequest request) {
        if (StringUtils.isNotEmpty(request.getDescricao())) {
            query += " WHERE UPPER(l.descricao) LIKE CONCAT(UPPER(:descricao), '%')";

            if (nonNull(request.getDataVencimentoDe())) {
                query += " AND l.dataVencimento = :dataVencimentoDe";
            }

            if (nonNull(request.getDataVencimentoAte())) {
                query += " AND l.dataVencimento <= :dataVencimentoAte";
            }

            return query;
        }

        if (nonNull(request.getDataVencimentoDe())) {
            query += " WHERE l.dataVencimento >= :dataVencimentoDe";

            if (nonNull(request.getDataVencimentoAte())) {
                query += " AND l.dataVencimento <= :dataVencimentoAte";
            }

            return query;
        }

        if (nonNull(request.getDataVencimentoAte())) {
            query += " WHERE l.dataVencimento <= :dataVencimentoAte";
        }

        return query;
    }
}
