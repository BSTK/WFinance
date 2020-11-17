package dev.bstk.wfinance.core.exceptionhandler;

import dev.bstk.wfinance.core.exception.DadosInvalidosException;
import dev.bstk.wfinance.pessoa.domain.exception.EnderecoJaCadastradoException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import static dev.bstk.wfinance.core.exceptionhandler.ExceptionRequestErros.criaListaDeErrosOcorridos;

@ControllerAdvice
public class ExceptionErrorHandler extends ResponseEntityExceptionHandler {

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

    @ExceptionHandler(value = { EnderecoJaCadastradoException.class })
    public ResponseEntity<Object> handlerException(EnderecoJaCadastradoException ex,
                                                   WebRequest request) {

        final var errosOcorridosNaRequest = criaListaDeErrosOcorridos(ex, request);
        return handleExceptionInternal(ex, errosOcorridosNaRequest, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = { DadosInvalidosException.class })
    public ResponseEntity<Object> handlerException(DadosInvalidosException ex,
                                                   WebRequest request) {

        final var errosOcorridosNaRequest = criaListaDeErrosOcorridos(ex, request);
        return handleExceptionInternal(ex, errosOcorridosNaRequest, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @ExceptionHandler(value = { EmptyResultDataAccessException.class })
    public ResponseEntity<Object> handlerException(EmptyResultDataAccessException ex,
                                                   WebRequest request) {

        final var errosOcorridosNaRequest = criaListaDeErrosOcorridos(ex, request);
        return handleExceptionInternal(ex, errosOcorridosNaRequest, new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }
}
