package dev.bstk.wfinance.lancamento.domain.repository;

abstract class LancamentoRepositoryQueryConstants {

    static final String QUERY_COUNT = "SELECT count(*) FROM Lancamento l ";

    static final String QUERY_FILTRO = "SELECT l FROM Lancamento l JOIN FETCH l.pessoa JOIN FETCH l.categoria";

    static final String QUERY_ESTATISTICA_PESSOA = "SELECT NEW "
        + " dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorPessoa( "
        + "     l.tipo, "
        + "     p.nome, "
        + "     SUM(l.valor) "
        + " ) "
        + " FROM Lancamento l "
        + " JOIN  l.pessoa p "
        + " WHERE l.dataVencimento >= :inicio "
        + " AND   l.dataVencimento <= :fim   "
        + " GROUP BY l.tipo, p.nome ";

    static final String QUERY_ESTATISTICA_CATEGORIA = "SELECT NEW "
        + " dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorCategoria( "
        + " SUM(l.valor), "
        + " c.nome) "
        + " FROM Lancamento l "
        + " JOIN  l.categoria c "
        + " WHERE l.dataVencimento >= :primeiroDia "
        + " AND   l.dataVencimento <= :ultimoDia   "
        + " GROUP BY c.nome ";

    static final String QUERY_ESTATISTICA_DIA = "SELECT NEW "
        + " dev.bstk.wfinance.lancamento.domain.projecao.LancamentoEstatisticaPorDia( "
        + "     l.tipo, "
        + "     l.dataVencimento, "
        + "     SUM(l.valor)"
        + " ) "
        + " FROM  Lancamento  l "
        + " JOIN  l.categoria c "
        + " WHERE l.dataVencimento >= :primeiroDia "
        + " AND   l.dataVencimento <= :ultimoDia   "
        + " GROUP BY l.tipo, l.dataVencimento ";

    static final String QUERY_RESUMO = "SELECT NEW dev.bstk.wfinance.lancamento.domain.projecao.ResumoLancamento("
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

    private LancamentoRepositoryQueryConstants() {
        throw new AssertionError("Não instanciar LancamentoRepositoryQueryConstants");
    }
}
