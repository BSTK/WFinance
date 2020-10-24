package dev.bstk.wfinance.core.evento;

import lombok.Getter;
import lombok.ToString;
import org.springframework.context.ApplicationEvent;

import javax.servlet.http.HttpServletResponse;

@Getter
@ToString
public class NovoRecursoCriadoEvento extends ApplicationEvent {

    private final Long id;
    private final HttpServletResponse response;

    public NovoRecursoCriadoEvento(final Object source,
                                   final HttpServletResponse response,
                                   final Long id) {
        super(source);
        this.id = id;
        this.response = response;
    }

}
