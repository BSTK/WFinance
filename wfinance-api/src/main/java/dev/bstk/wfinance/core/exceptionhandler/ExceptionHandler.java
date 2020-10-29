package dev.bstk.wfinance.core.exceptionhandler;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static dev.bstk.wfinance.core.exceptionhandler.ExceptionRequestErros.criaListaDeErrosOcorridos;

@ControllerAdvice
public class ExceptionHandler extends ResponseEntityExceptionHandler {

    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {

        final var errosOcorridosNaRequest = criaListaDeErrosOcorridos(request);
        return handleExceptionInternal(ex, errosOcorridosNaRequest, headers, HttpStatus.BAD_REQUEST, request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,
                                                                  HttpHeaders headers,
                                                                  HttpStatus status,
                                                                  WebRequest request) {

        final var errosOcorridosNaRequest = criaListaDeErrosOcorridos(request, ex.getBindingResult());
        return super.handleExceptionInternal(ex, errosOcorridosNaRequest, headers, status, request);
    }

}
