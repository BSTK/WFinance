package dev.bstk.wfinance.core.seguranca.token;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.http.server.ServletServerHttpResponse;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

import static dev.bstk.wfinance.core.seguranca.token.RefreshTokenConstants.*;

@ControllerAdvice
public class RefreshTokenProcessador implements ResponseBodyAdvice<OAuth2AccessToken> {

    private static final Integer MAX_AGE_30_DIAS = 2_592_000;

    @Value("${wfinance.configuracao.cookie-secure}")
    private boolean cookieSecure;

    @Override
    public boolean supports(final MethodParameter methodParameter,
                            final Class<? extends HttpMessageConverter<?>> converterType) {
        Objects.requireNonNull(methodParameter.getMethod(),
            "RefreshTokenProcessador.supports(MethodParameter methodParameter) é nulo");

        return POST_ACESS_TOKEN.equals(methodParameter.getMethod().getName());
    }

    @Override
    public OAuth2AccessToken beforeBodyWrite(final OAuth2AccessToken oAuth2AccessToken,
                                             final MethodParameter methodParameter,
                                             final MediaType mediaType, Class<? extends HttpMessageConverter<?>> aClass,
                                             final ServerHttpRequest serverHttpRequest,
                                             final ServerHttpResponse serverHttpResponse) {
        final HttpServletRequest request = ((ServletServerHttpRequest) serverHttpRequest).getServletRequest();
        final HttpServletResponse response = ((ServletServerHttpResponse) serverHttpResponse).getServletResponse();

        final String refreshToken = oAuth2AccessToken.getRefreshToken().getValue();
        final Cookie refreshTokenCookie = criarCookieRefreshToken(refreshToken, request);
        response.addCookie(refreshTokenCookie);

        DefaultOAuth2AccessToken oAuth2AccessTokenResponse = (DefaultOAuth2AccessToken) oAuth2AccessToken;
        oAuth2AccessTokenResponse.setRefreshToken(null);

        return oAuth2AccessTokenResponse;
    }

    private Cookie criarCookieRefreshToken(final String refreshToken,
                                           final HttpServletRequest request) {
        final Cookie refreshTokenCookie = new Cookie(REFRESH_TOKEN, refreshToken);
        refreshTokenCookie.setSecure(cookieSecure);
        refreshTokenCookie.setHttpOnly(Boolean.TRUE);
        refreshTokenCookie.setMaxAge(MAX_AGE_30_DIAS);
        refreshTokenCookie.setPath(request.getContextPath() + PATH_OAUTH_TOKEN);
        return refreshTokenCookie;
    }
}
