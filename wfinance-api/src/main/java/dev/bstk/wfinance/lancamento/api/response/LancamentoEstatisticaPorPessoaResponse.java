package dev.bstk.wfinance.lancamento.api.response;

import dev.bstk.wfinance.lancamento.domain.entidade.Tipo;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
@ToString
public class LancamentoEstatisticaPorPessoaResponse {

    @NotNull
    private Tipo tipo;

    @NotNull
    private String pessoa;

    @NotNull
    private BigDecimal total;
}
