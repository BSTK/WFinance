package dev.bstk.wfinance.core.configuracao;

import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

import java.time.Duration;
import java.time.temporal.ChronoUnit;

@Configuration
public class ConfiguracaoBeans {

    @Bean
    public RestTemplate template() {
        return new RestTemplateBuilder()
            .setConnectTimeout(Duration.of(5, ChronoUnit.SECONDS))
            .setReadTimeout(Duration.of(5, ChronoUnit.SECONDS))
            .build();
    }

}
