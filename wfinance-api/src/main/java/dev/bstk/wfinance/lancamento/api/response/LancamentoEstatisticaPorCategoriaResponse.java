package dev.bstk.wfinance.lancamento.api.response;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@ToString
public class LancamentoEstatisticaPorCategoriaResponse {

    @NotNull
    private BigDecimal total;

    @NotNull
    private String categoria;

}
