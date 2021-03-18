package dev.bstk.wfinance.core.email;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.List;

@Data
@Builder
@ToString
@AllArgsConstructor
public class Email implements Serializable {

    @NotNull
    @NotEmpty
    private final String assunto;

    @NotNull
    @NotEmpty
    private final String remetente;

    @NotNull
    @NotEmpty
    private final String menssagem;

    @NotNull
    @NotEmpty
    private final List<String> destinatarios;

}
