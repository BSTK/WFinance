package dev.bstk.wfinance.core.seguranca;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.provider.token.TokenStore;

@Configuration
@EnableAuthorizationServer
public class ConfiguracaoAutorizadorServer extends AuthorizationServerConfigurerAdapter {

    private final TokenStore tokenStore;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public ConfiguracaoAutorizadorServer(final TokenStore tokenStore,
                                         final PasswordEncoder passwordEncoder,
                                         final AuthenticationManager authenticationManager) {
        this.tokenStore = tokenStore;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    @Override
    public void configure(AuthorizationServerEndpointsConfigurer endpoints) {
        endpoints
            .tokenStore(tokenStore)
            .authenticationManager(authenticationManager);
    }

    @Override
    public void configure(ClientDetailsServiceConfigurer clients) throws Exception {
        clients.inMemory()
            .withClient("web-angular")
            .secret(passwordEncoder.encode("web-angular-pwd"))
            .scopes("read", "write")
            .authorizedGrantTypes("password")
            .accessTokenValiditySeconds(1800);
    }
}
