package dev.bstk.wfinance.integracao.core.exceptionhandler;

import dev.bstk.wfinance.integracao.core.exception.IntegracaoException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class ExceptionErrorHandler extends ResponseEntityExceptionHandler {


    @ExceptionHandler(value = { IntegracaoException.class })
    public ResponseEntity<Object> handlerException(IntegracaoException ex,
                                                   WebRequest request) {

        final var errosOcorridosNaRequest = ExceptionRequestErros.criaListaDeErrosOcorridos(ex, request);
        return handleExceptionInternal(ex, errosOcorridosNaRequest, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

}
