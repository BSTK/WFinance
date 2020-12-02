package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import org.apache.commons.lang3.StringUtils;

import static java.util.Objects.nonNull;

class LancamentoRepositoryQueryFormatadorSql {

    private LancamentoRepositoryQueryFormatadorSql() {
        throw new UnsupportedOperationException("Não instanciar LancamentoRepositoryQueryFormatadorSQL");
    }

    static String queryFiltro(final LancamentoFiltroRequest request) {
        return query("SELECT l FROM Lancamento l JOIN FETCH l.pessoa JOIN FETCH l.categoria", request);
    }

    static String queryResumo(final LancamentoFiltroRequest request) {
        return query("SELECT NEW dev.bstk.wfinance.lancamento.domain.projecao.ResumoLancamento( "
            + " l.id, l.descricao, l.dataVencimento, l.dataPagamento, l.valor, "
            + " l.observacao, l.tipo, c.nome, p.nome) "
            + " FROM Lancamento l JOIN l.pessoa p JOIN l.categoria c", request);
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
