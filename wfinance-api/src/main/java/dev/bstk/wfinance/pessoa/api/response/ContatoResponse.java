package dev.bstk.wfinance.pessoa.api.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ContatoResponse implements Serializable {

    @EqualsAndHashCode.Include
    private Long id;

    @NotNull @NotEmpty
    private String nome;

    @NotNull @NotEmpty
    private String email;

    @NotNull @NotEmpty
    private String telefone;

}
