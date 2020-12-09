package dev.bstk.wfinance.core.exception;

import lombok.Getter;

@Getter
public class DadosInvalidosException extends RuntimeException {

    private final String campo;
    private final String valor;
    private final String mensagem;

    public DadosInvalidosException(final String campo,
                                   final Object valor,
                                   final String mensagem) {
        super("Dados inválidos");
        this.campo = campo;
        this.mensagem = mensagem;
        this.valor = String.valueOf(valor);
    }
}
