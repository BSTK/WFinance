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
    private final Tipo tipo;

    @NotNull
    private final String pessoa;

    @NotNull
    private final BigDecimal total;

    public LancamentoEstatisticaPorPessoa(final @NotNull Tipo tipo,
                                          final @NotNull String pessoa,
                                          final @NotNull BigDecimal total) {
        this.tipo = tipo;
        this.pessoa = pessoa;
        this.total = total;
    }
}
