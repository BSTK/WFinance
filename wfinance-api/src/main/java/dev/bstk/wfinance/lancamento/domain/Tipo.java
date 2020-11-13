package dev.bstk.wfinance.lancamento.domain;

public enum Tipo {

    RECEITA("Receitas"),
    DESPESA("Despesas");

    private final String label;

    Tipo(final String label) {
        this.label = label;
    }

}
