package dev.bstk.wfinance.core.seguranca.token;

import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

import static dev.bstk.wfinance.core.seguranca.token.RefreshTokenConstants.*;

@Component
@Order(Ordered.HIGHEST_PRECEDENCE)
public class RefreshTokenProcessadorFilter implements Filter {

    @Override
    public void doFilter(final ServletRequest servletRequest,
                         final ServletResponse servletResponse,
                         final FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        final boolean interceptarRequisicao = request.getRequestURI().endsWith(PATH_OAUTH_TOKEN)
            && request.getParameter(GRANT_TYPE).equals(REFRESH_TOKEN)
            && Objects.nonNull(request.getCookies());

        if (interceptarRequisicao) {
            for (Cookie cookie : request.getCookies()) {
                if (REFRESH_TOKEN.equals(cookie.getName())) {
                    final String cookieRefreshToken = cookie.getValue();
                    request = new RefreshTokenRequestWrapper(cookieRefreshToken, request);
                }
            }
        }

        filterChain.doFilter(request, response);
    }
}
