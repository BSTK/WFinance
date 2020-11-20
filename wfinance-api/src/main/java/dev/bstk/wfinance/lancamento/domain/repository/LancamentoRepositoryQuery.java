package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;

import java.util.List;

public interface LancamentoRepositoryQuery {

    List<Lancamento> filtar(LancamentoFiltroRequest request);
}
