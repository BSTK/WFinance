package dev.bstk.wfinance.integracao.ibge.response;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Data
@ToString
@JsonIgnoreProperties(ignoreUnknown = true)
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class CidadeResponse {

    @EqualsAndHashCode.Include
    private Long id;
    private String nome;

}
