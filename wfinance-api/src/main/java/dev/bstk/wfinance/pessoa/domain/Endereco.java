package dev.bstk.wfinance.pessoa.domain;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Embeddable
public class Endereco implements Serializable {

    @NotNull
    @NotEmpty
    @Column(name = "ESTADO")
    private String estado;

    @NotNull
    @NotEmpty
    @Column(name = "CEP")
    private String cep;

    @NotNull
    @NotEmpty
    @Column(name = "CIDADE")
    private String cidade;

    @NotNull
    @NotEmpty
    @Column(name = "BAIRRO")
    private String bairro;

    @NotNull
    @NotEmpty
    @Column(name = "LOGRADOURO")
    private String logradouro;

    @NotNull
    @NotEmpty
    @Column(name = "NUMERO")
    private String numero;

    @Column(name = "COMPLEMENTO")
    private String complemento;
}
