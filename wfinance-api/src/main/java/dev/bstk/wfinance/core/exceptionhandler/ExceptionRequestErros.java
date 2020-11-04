package dev.bstk.wfinance.core.exceptionhandler;

import org.springframework.validation.BindingResult;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

class ExceptionRequestErros {

    private static final String DADOS_INVALIDOS = "Dados inválidos";
    private static final String CAMPOS_DESCONHECIDOS = "Campos Desconhecidos";

    private ExceptionRequestErros() { }

    static ExceptionError criaListaDeErrosOcorridos(final WebRequest request,
                                                    final BindingResult bindingResult) {
        final List<ExceptionErrorItem> erros = new ArrayList<>();

        bindingResult.getFieldErrors().forEach(erroRequest -> {
            final var erroOcorrido = new ExceptionErrorItem(
                erroRequest.getField(),
                erroRequest.getDefaultMessage(),
                String.valueOf(erroRequest.getRejectedValue())
            );

            erros.add(erroOcorrido);
        });

        return criaListaDeErrosOcorridos(DADOS_INVALIDOS, request, erros);
    }

    static Object criaListaDeErrosOcorridos(final WebRequest request) {
        return criaListaDeErrosOcorridos(CAMPOS_DESCONHECIDOS,
            request,
            Collections.emptyList());
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
