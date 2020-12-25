package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import dev.bstk.wfinance.lancamento.domain.projecao.ResumoLancamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LancamentoRepositoryQuery {

    String QUERY_COUNT = "SELECT count(*) FROM Lancamento l ";

    String QUERY_FILTRO = "SELECT l FROM Lancamento l JOIN FETCH l.pessoa JOIN FETCH l.categoria";

    String QUERY_RESUMO = "SELECT NEW dev.bstk.wfinance.lancamento.domain.projecao.ResumoLancamento("
                        + " l.id, "
                        + " l.descricao, "
                        + " l.dataVencimento, "
                        + " l.dataPagamento, "
                        + " l.valor, "
                        + " l.observacao, "
                        + " l.tipo, "
                        + " c.nome, "
                        + " p.nome) "
                        + " FROM Lancamento l "
                        + " JOIN l.pessoa p "
                        + " JOIN l.categoria c ";

    Page<Lancamento> filtar(Pageable pageable, LancamentoFiltroRequest request);

    Page<ResumoLancamento> resumo(Pageable pageable, LancamentoFiltroRequest request);
}
