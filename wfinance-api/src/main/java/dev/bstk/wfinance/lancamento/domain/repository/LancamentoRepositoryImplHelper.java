package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;

import java.util.Map;

import static dev.bstk.wfinance.core.helper.StringHelper.orEmpty;

final class LancamentoRepositoryImplHelper {

    private LancamentoRepositoryImplHelper() {
    }

    private static final String QUERY_PARAM_DESCRICAO = "descricao";
    private static final String QUERY_PARAM_DATA_VENCIMENTO_DE = "dataVencimentoDe";
    private static final String QUERY_PARAM_DATA_VENCIMENTO_ATE = "dataVencimentoAte";

    static Map<String, Object> parametros(final LancamentoFiltroRequest request) {
        return Map.of(
            QUERY_PARAM_DESCRICAO, orEmpty(request.getDescricao()),
            QUERY_PARAM_DATA_VENCIMENTO_DE, orEmpty(request.getDataVencimentoDe()),
            QUERY_PARAM_DATA_VENCIMENTO_ATE, orEmpty(request.getDataVencimentoAte())
        );
    }
}
