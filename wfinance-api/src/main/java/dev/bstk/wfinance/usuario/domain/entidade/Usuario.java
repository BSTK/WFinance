package dev.bstk.wfinance.usuario.domain.entidade;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "USUARIO")
public class Usuario implements Serializable {

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
    @Column(name = "SENHA")
    private String senha;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "USUARIO_PERMISSAO",
        joinColumns = @JoinColumn(name = "USUARIO_ID"),
        inverseJoinColumns = @JoinColumn(name = "PERMISSAO_ID"))
    private Set<Permissao> permissoes = new HashSet<>();

}
