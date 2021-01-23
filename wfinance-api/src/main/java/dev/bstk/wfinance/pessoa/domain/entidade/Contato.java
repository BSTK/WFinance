package dev.bstk.wfinance.pessoa.domain.entidade;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Entity
@Table(name = "CONTATO")
public class Contato implements Serializable {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotEmpty
    @Column(name = "NOME")
    private String nome;

    @NotNull
    @NotEmpty
    @Column(name = "EMAIL")
    private String email;

    @NotNull
    @NotEmpty
    @Column(name = "TELEFONE")
    private String telefone;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "PESSOA_ID")
    private Pessoa pessoa;

}
