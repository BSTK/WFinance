package dev.bstk.wfinance.core.seguranca;

import dev.bstk.wfinance.usuario.domain.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;

@Configuration
@EnableAuthorizationServer
public class ConfiguracaoAutorizadorServer extends AuthorizationServerConfigurerAdapter {

    private static final int TEMPO_DE_VIDA_ACCESS_TOKEN = 30;
    private static final int TEMPO_DE_VIDA_REFRESH_TOKEN = 3600 * 24;

    private static final String GRANT_TYPE_PASSWORD = "password";
    private static final String GRANT_TYPE_REFRESH_TOKEN = "refresh_token";


    private final TokenStore tokenStore;
    private final UsuarioService usuarioService;
    private final JwtAccessTokenConverter tokenConverter;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public ConfiguracaoAutorizadorServer(final TokenStore tokenStore,
                                         final UsuarioService usuarioService,
                                         final JwtAccessTokenConverter tokenConverter,
                                         final AuthenticationManager authenticationManager) {
        this.tokenStore = tokenStore;
        this.usuarioService = usuarioService;
        this.tokenConverter = tokenConverter;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public void configure(final AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints
            .tokenStore(tokenStore)
            .userDetailsService(usuarioService)
            .accessTokenConverter(tokenConverter)
            .authenticationManager(authenticationManager)
            .reuseRefreshTokens(Boolean.FALSE);
    }

    @Override
    public void configure(final ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()
            .withClient("web-angular")
            .secret("$2a$10$51JK4K3kEMdlui9Aj6fkmOb/IVT1e4aqPXAxTKGAm3dT/tsYOOHBG")
            .scopes("read", "write")
            .authorizedGrantTypes(GRANT_TYPE_PASSWORD, GRANT_TYPE_REFRESH_TOKEN)
            .refreshTokenValiditySeconds(TEMPO_DE_VIDA_REFRESH_TOKEN)
            .accessTokenValiditySeconds(TEMPO_DE_VIDA_ACCESS_TOKEN);
    }
}
