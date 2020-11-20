package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import org.apache.commons.lang3.StringUtils;

import static java.util.Objects.nonNull;

class LancamentoRepositoryQueryFormatadorSQL {

    private LancamentoRepositoryQueryFormatadorSQL() {
        throw new UnsupportedOperationException("Não instanciar LancamentoRepositoryQueryFormatadorSQL");
    }

    static String formatarQuery(final LancamentoFiltroRequest request) {
        var query = "SELECT l FROM Lancamento l JOIN FETCH l.pessoa JOIN FETCH l.categoria";

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
