package dev.bstk.wfinance.categoria.domain;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Data
@Entity
@Table(name = "CATEGORIA")
public class Categoria implements Serializable {

    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @NotEmpty
    @Column(name = "NOME")
    private String nome;

    public Categoria() { }

    public Categoria(@NotNull @NotEmpty String nome) {
        this.nome = nome;
    }
}