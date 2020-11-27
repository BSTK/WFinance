package dev.bstk.wfinance.core.seguranca;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.config.annotation.web.configuration.ResourceServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configurers.ResourceServerSecurityConfigurer;

@Configuration
@EnableWebSecurity
public class ConfiguracaoResourceServer extends ResourceServerConfigurerAdapter {

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public ConfiguracaoResourceServer(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    public void configure(final AuthenticationManagerBuilder auth) throws Exception {
        auth.inMemoryAuthentication()
            .withUser("admin")
            .password(passwordEncoder.encode("admin"))
            .roles("ROLE");
    }

    @Override
    public void configure(final HttpSecurity http) throws Exception {
        http.authorizeRequests()
            .antMatchers("/**/categorias/**")
            .permitAll()
            .anyRequest()
            .authenticated()
            .and()
            .httpBasic()
            .and()
            .sessionManagement()
            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
            .csrf()
            .disable();
    }

    @Override
    public void configure(ResourceServerSecurityConfigurer resources) {
        resources.stateless(Boolean.FALSE);
    }
}
