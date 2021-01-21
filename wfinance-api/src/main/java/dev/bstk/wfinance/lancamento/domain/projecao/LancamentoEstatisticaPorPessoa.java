package dev.bstk.wfinance.lancamento.domain.projecao;

import dev.bstk.wfinance.lancamento.domain.entidade.Tipo;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@ToString
public class LancamentoEstatisticaPorPessoa {

    @NotNull
    private Tipo tipo;

    @NotNull
    private String pessoa;

    @NotNull
    private BigDecimal total;
}
