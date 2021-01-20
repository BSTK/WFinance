package dev.bstk.wfinance.lancamento.domain.projecao;

import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@ToString
public class LancamentoEstatisticaPorCategoria {

    @NotNull
    private final BigDecimal total;

    @NotNull
    private final String categoria;

    public LancamentoEstatisticaPorCategoria(@NotNull final BigDecimal total,
                                             @NotNull final String categoria) {
        this.total = total;
        this.categoria = categoria;
    }
}
