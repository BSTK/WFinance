package dev.bstk.wfinance.lancamento.domain.projecao;

import dev.bstk.wfinance.lancamento.domain.entidade.Tipo;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@ToString
public class LancamentoEstatisticaPorDia {

    @NotNull
    private final Tipo tipo;

    @NotNull
    private final LocalDate dia;

    @NotNull
    private final BigDecimal total;

    public LancamentoEstatisticaPorDia(final @NotNull Tipo tipo,
                                       final @NotNull LocalDate dia,
                                       final @NotNull BigDecimal total) {
        this.tipo = tipo;
        this.dia = dia;
        this.total = total;
    }
}
