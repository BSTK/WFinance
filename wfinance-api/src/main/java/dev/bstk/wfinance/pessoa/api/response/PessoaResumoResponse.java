package dev.bstk.wfinance.pessoa.api.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PessoaResumoResponse implements Serializable {

    @EqualsAndHashCode.Include
    private Long id;
    private String nome;

}
