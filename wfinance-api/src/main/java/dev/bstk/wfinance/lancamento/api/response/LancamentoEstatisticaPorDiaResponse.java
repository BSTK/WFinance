package dev.bstk.wfinance.lancamento.api.response;

import dev.bstk.wfinance.lancamento.domain.entidade.Tipo;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@ToString
public class LancamentoEstatisticaPorDiaResponse {

    @NotNull
    private Tipo tipo;

    @NotNull
    private LocalDate dia;

    @NotNull
    private BigDecimal total;
}
