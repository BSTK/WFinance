package dev.bstk.wfinance.categoria.api.response;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class CategoriaResponse implements Serializable {

    @EqualsAndHashCode.Include
    private Long id;
    private String nome;
    private String cor;
}
