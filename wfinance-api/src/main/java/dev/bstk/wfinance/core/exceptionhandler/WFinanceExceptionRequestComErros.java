package dev.bstk.wfinance.core.exceptionhandler;

import org.springframework.validation.BindingResult;
import org.springframework.web.context.request.ServletWebRequest;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class WFinanceExceptionRequestComErros {

    private static final String DADOS_INVALIDOS = "Dados inválidos";
    private static final String CAMPOS_DESCONHECIDOS = "Campos Desconhecidos";

    private WFinanceExceptionRequestComErros() { }

    public static WFinanceExceptionError criaListaDeErrosOcorridos(final WebRequest request,
                                                                   final BindingResult bindingResult) {
        final List<WFinanceExceptionErrorItem> erros = new ArrayList<>();

        bindingResult.getFieldErrors().forEach(atributoDaRequestComErro -> {
            final var erroOcorrido = new WFinanceExceptionErrorItem(
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

    private static WFinanceExceptionError wFinanceExceptionError(final String mensagem,
                                                                 final WebRequest request,
                                                                 final List<WFinanceExceptionErrorItem> erros) {
        return new WFinanceExceptionError(
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
