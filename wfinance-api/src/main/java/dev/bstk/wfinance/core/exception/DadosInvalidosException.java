package dev.bstk.wfinance.core.exception;

import lombok.Getter;

@Getter
public class DadosInvalidosException extends RuntimeException {

    private final String campo;
    private final String valor;
    private final String mensagem;

    public DadosInvalidosException(final String campo,
                                   final String valor,
                                   final String mensagem) {
        super("Dados inválidos");
        this.campo = campo;
        this.valor = valor;
        this.mensagem = mensagem;
    }
}
