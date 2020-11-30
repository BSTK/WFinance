package dev.bstk.wfinance.core.seguranca.token;

import org.springframework.core.MethodParameter;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Objects;

@ControllerAdvice
public class RefreshTokenProcessador implements ResponseBodyAdvice<OAuth2AccessToken> {

    private static final Integer MAX_AGE_30_DIAS = 2_592_000;
    private static final String POST_ACESS_TOKEN = "postAcessToken";
    private static final String PATH_OAUTH_TOKEN = "\"/oauth/token\"";

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
        final HttpServletRequest request = (HttpServletRequest) serverHttpRequest;
        final HttpServletResponse response = (HttpServletResponse) serverHttpResponse;

        final String refreshToken = oAuth2AccessToken.getRefreshToken().getValue();
        final Cookie refreshTokenCookie = criarCookieRefreshToken(refreshToken, request);
        response.addCookie(refreshTokenCookie);

        DefaultOAuth2AccessToken oAuth2AccessTokenResponse = (DefaultOAuth2AccessToken) oAuth2AccessToken;
        oAuth2AccessTokenResponse.setRefreshToken(null);

        return oAuth2AccessTokenResponse;
    }

    private Cookie criarCookieRefreshToken(final String refreshToken,
                                           final HttpServletRequest request) {
        final Cookie refreshTokenCookie = new Cookie(OAuth2AccessToken.REFRESH_TOKEN, refreshToken);
        /// TODO: SETAR TRUE EM PRODUÇÃO
        refreshTokenCookie.setSecure(Boolean.FALSE);

        refreshTokenCookie.setHttpOnly(Boolean.TRUE);
        refreshTokenCookie.setPath(request.getContextPath() + PATH_OAUTH_TOKEN);
        refreshTokenCookie.setMaxAge(MAX_AGE_30_DIAS);
        return refreshTokenCookie;
    }
}
