package dev.bstk.wfinance.integracao.core.exceptionhandler;

import dev.bstk.wfinance.core.exception.DadosInvalidosException;
import dev.bstk.wfinance.core.exceptionhandler.ExceptionError;
import dev.bstk.wfinance.core.exceptionhandler.ExceptionErrorItem;
import dev.bstk.wfinance.integracao.core.exception.IntegracaoException;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

class ExceptionRequestErros {

    private ExceptionRequestErros() { }

    static Object criaListaDeErrosOcorridos(final IntegracaoException ex, final WebRequest request) {
        final var erro = new ExceptionErrorItem("url", ex.getMensagem(), ex.getUrl());
        return criaListaDeErrosOcorridos(ex.getMensagem(), request, Collections.singletonList(erro));
    }

    private static ExceptionError criaListaDeErrosOcorridos(final String mensagem,
                                                            final WebRequest request,
                                                            final List<ExceptionErrorItem> erros) {
        return new ExceptionError(
            mensagem,
            ((ServletWebRequest) request).getHttpMethod().name(),
            ServletUriComponentsBuilder.fromCurrentRequest()
                .build()
                .toUriString(),
            LocalDateTime.now(),
            erros
        );
    }
}
