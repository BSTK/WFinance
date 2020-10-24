package dev.bstk.wfinance.core.exceptionhandler;

import org.springframework.validation.BindingResult;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ExceptionRequestComErros {

    private static final String DADOS_INVALIDOS = "Dados inválidos";
    private static final String CAMPOS_DESCONHECIDOS = "Campos Desconhecidos";

    private ExceptionRequestComErros() { }

    public static ExceptionError criaListaDeErrosOcorridos(final WebRequest request,
                                                           final BindingResult bindingResult) {
        final List<ExceptionErrorItem> erros = new ArrayList<>();

        bindingResult.getFieldErrors().forEach(atributoDaRequestComErro -> {
            final var erroOcorrido = new ExceptionErrorItem(
                atributoDaRequestComErro.getField(),
                atributoDaRequestComErro.getDefaultMessage(),
                String.valueOf(atributoDaRequestComErro.getRejectedValue())
            );

            erros.add(erroOcorrido);
        });

        return wFinanceExceptionError(DADOS_INVALIDOS, request, erros);
    }

    public static Object criaListaDeErrosOcorridos(WebRequest request) {
        return wFinanceExceptionError(CAMPOS_DESCONHECIDOS,
            request,
            Collections.emptyList());
    }

    private static ExceptionError wFinanceExceptionError(final String mensagem,
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
