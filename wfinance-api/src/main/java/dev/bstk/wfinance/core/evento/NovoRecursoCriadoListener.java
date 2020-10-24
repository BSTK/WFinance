package dev.bstk.wfinance.core.evento;

import org.springframework.context.ApplicationListener;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Component
public class NovoRecursoCriadoListener implements ApplicationListener<NovoRecursoCriadoEvento> {

    @Override
    public void onApplicationEvent(final NovoRecursoCriadoEvento novoRecursoCriadoEvento) {
        final var id = novoRecursoCriadoEvento.getId();
        final var response = novoRecursoCriadoEvento.getResponse();
        final var uri = ServletUriComponentsBuilder.fromCurrentRequest()
            .path("/{id}")
            .buildAndExpand(id)
            .toUri();

        response.setHeader(HttpHeaders.LOCATION, uri.toASCIIString());
    }
}
