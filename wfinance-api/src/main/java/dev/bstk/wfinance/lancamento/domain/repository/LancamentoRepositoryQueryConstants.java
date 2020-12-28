package dev.bstk.wfinance.lancamento.domain.repository;

abstract class LancamentoRepositoryQueryConstants {

    static final String QUERY_COUNT = "SELECT count(*) FROM Lancamento l ";

    static final String QUERY_FILTRO = "SELECT l FROM Lancamento l JOIN FETCH l.pessoa JOIN FETCH l.categoria";

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
