package dev.bstk.wfinance.core.exception;

import lombok.Getter;

@Getter
public class IntegracaoException extends RuntimeException {

    private final String url;
    private final String mensagem;

    public IntegracaoException(final String url,
                               final String mensagem) {
        super("Erro ao integrar com serviço externo");
        this.url = url;
        this.mensagem = mensagem;
    }
}
