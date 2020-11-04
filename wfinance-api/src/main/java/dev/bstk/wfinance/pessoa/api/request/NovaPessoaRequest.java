package dev.bstk.wfinance.pessoa.api.request;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@ToString
public class NovaPessoaRequest implements Serializable {

    @NotNull
    @NotEmpty
    private String nome;

    @NotNull
    private boolean ativo;

    private EnderecoRequest endereco;

}
