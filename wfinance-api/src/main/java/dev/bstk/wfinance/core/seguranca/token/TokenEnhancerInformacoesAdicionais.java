package dev.bstk.wfinance.core.seguranca.token;

import dev.bstk.wfinance.usuario.domain.UsuarioSistema;
import org.springframework.security.oauth2.common.DefaultOAuth2AccessToken;
import org.springframework.security.oauth2.common.OAuth2AccessToken;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;

import java.util.HashMap;
import java.util.Map;

public class TokenEnhancerInformacoesAdicionais implements TokenEnhancer {

    @Override
    public OAuth2AccessToken enhance(final OAuth2AccessToken accessToken,
                                     final OAuth2Authentication authentication) {
        final UsuarioSistema usuarioSistema = (UsuarioSistema) authentication.getPrincipal();

        final Map<String, Object> informacoesUsuario = new HashMap<>();
        informacoesUsuario.put("nome", usuarioSistema.getUsuario().getNome());
        informacoesUsuario.put("email", usuarioSistema.getUsuario().getEmail());

        ((DefaultOAuth2AccessToken) accessToken).setAdditionalInformation(informacoesUsuario);

        return accessToken;
    }

}
