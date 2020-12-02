package dev.bstk.wfinance.core.seguranca;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class ConfiguracaoCorsFilter implements Filter {

    @Value("${configuracao.cors.origem}")
    private String origem;

    private static final String MAX_AGE = "3600";
    private static final String FORMAT_HEADERS_HTTP_PERMITIDOS = "%s, %s, %s";
    private static final String FORMAT_METODOS_HTTP_PERMITIDOS = "%s, %s, %s, %s, %s, %s, %s, %s";

    @Override
    public void doFilter(final ServletRequest servletRequest,
                         final ServletResponse servletResponse,
                         final FilterChain chain) throws IOException, ServletException {
        final HttpServletRequest request = (HttpServletRequest) servletRequest;
        final HttpServletResponse response = (HttpServletResponse) servletResponse;

        final boolean interceptarCors = HttpMethod.OPTIONS.name().equals(request.getMethod())
                                     && request.getHeader(HttpHeaders.ORIGIN).equals(origem);

        response.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN, origem);
        response.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_CREDENTIALS, Boolean.TRUE.toString());

        if (interceptarCors) {
            final String metodosHttpPermitidos = String.format(
                FORMAT_METODOS_HTTP_PERMITIDOS,
                HttpMethod.GET, HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE,
                HttpMethod.OPTIONS, HttpMethod.TRACE, HttpMethod.PATCH, HttpMethod.HEAD
            );

            final String headersHttpPermitidos = String.format(
                FORMAT_HEADERS_HTTP_PERMITIDOS,
                HttpHeaders.AUTHORIZATION,
                HttpHeaders.CONTENT_TYPE,
                HttpHeaders.ACCEPT
            );

            response.setStatus(HttpServletResponse.SC_OK);
            response.setHeader(HttpHeaders.ACCESS_CONTROL_MAX_AGE, MAX_AGE);
            response.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_METHODS, metodosHttpPermitidos);
            response.setHeader(HttpHeaders.ACCESS_CONTROL_ALLOW_HEADERS, headersHttpPermitidos);

        } else {
            chain.doFilter(request, response);
        }
    }
}
