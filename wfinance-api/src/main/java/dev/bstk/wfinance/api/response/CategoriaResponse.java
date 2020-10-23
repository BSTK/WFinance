package dev.bstk.wfinance.api.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.io.Serializable;

@Data
@ToString
@AllArgsConstructor
public class CategoriaResponse implements Serializable {

    private final Long id;
    private final String nome;
}
