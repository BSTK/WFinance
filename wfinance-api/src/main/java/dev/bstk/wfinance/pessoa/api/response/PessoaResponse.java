package dev.bstk.wfinance.pessoa.api.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Data
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class PessoaResponse implements Serializable {

    @EqualsAndHashCode.Include
    private Long id;

    private String nome;
    private boolean ativo;
    private EnderecoResponse endereco;
    private Set<ContatoResponse> contatos = new HashSet<>();

}
