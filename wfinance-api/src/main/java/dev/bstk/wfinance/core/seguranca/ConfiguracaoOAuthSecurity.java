package dev.bstk.wfinance.core.seguranca;

import dev.bstk.wfinance.core.seguranca.token.TokenEnhancerInformacoesAdicionais;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.provider.token.TokenEnhancer;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableWebSecurity
public class ConfiguracaoOAuthSecurity extends WebSecurityConfigurerAdapter {

    @Bean
    public TokenStore tokenStore() {
        return new JwtTokenStore(tokenConverter());
    }

    @Bean
    public TokenEnhancer tokenEnhancer() {
        return new TokenEnhancerInformacoesAdicionais();
    }

    @Bean
    public JwtAccessTokenConverter tokenConverter() {
        final var converter = new JwtAccessTokenConverter();
        converter.setSigningKey("web-angular-key");
        return converter;
    }

    @Bean
    public PasswordEncoder bcryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    protected AuthenticationManager authenticationManager() throws Exception {
        return super.authenticationManager();
    }

}
