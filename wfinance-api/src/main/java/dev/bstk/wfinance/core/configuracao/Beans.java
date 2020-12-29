package dev.bstk.wfinance.core.configuracao;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

@Configuration
public class Beans {

    @Bean
    public RestTemplate template() {
        return new RestTemplate(getClientHttpRequestFactory());
    }

    private HttpComponentsClientHttpRequestFactory getClientHttpRequestFactory() {
        final var clientHttpRequestFactory = new HttpComponentsClientHttpRequestFactory();
        clientHttpRequestFactory.setReadTimeout(5_000);
        clientHttpRequestFactory.setConnectTimeout(5_000);
        return clientHttpRequestFactory;
    }

}
