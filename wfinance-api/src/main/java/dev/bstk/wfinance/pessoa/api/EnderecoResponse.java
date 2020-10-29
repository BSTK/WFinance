package dev.bstk.wfinance.pessoa.api;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class EnderecoResponse implements Serializable {

    private String estado;
    private String cep;
    private String cidade;
    private String bairro;

    @EqualsAndHashCode.Include
    private String logradouro;

    @EqualsAndHashCode.Include
    private String numero;

    @EqualsAndHashCode.Include
    private String complemento;
}
