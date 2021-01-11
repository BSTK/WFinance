package dev.bstk.wfinance.core.seguranca.token;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import static dev.bstk.wfinance.core.seguranca.token.RefreshTokenConstants.PATH_OAUTH_TOKEN;
import static dev.bstk.wfinance.core.seguranca.token.RefreshTokenConstants.REFRESH_TOKEN;

@RestController
@RequestMapping("/api/v1/token")
public class TokenResource {

    @Value("${wfinance.configuracao.cookie-secure}")
    private boolean cookieSecure;

    @DeleteMapping("/logout")
    public void logout(final HttpServletRequest request, final HttpServletResponse response) {
        final var cookie = new Cookie(REFRESH_TOKEN, null);
        cookie.setPath(request.getContextPath() + PATH_OAUTH_TOKEN);
        cookie.setHttpOnly(Boolean.TRUE);
        cookie.setSecure(cookieSecure);
        cookie.setMaxAge(0);

        response.addCookie(cookie);
        response.setStatus(HttpStatus.NO_CONTENT.value());
    }
}
