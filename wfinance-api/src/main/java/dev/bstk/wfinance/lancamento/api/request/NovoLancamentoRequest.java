package dev.bstk.wfinance.lancamento.api.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import dev.bstk.wfinance.lancamento.domain.entidade.Tipo;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDate;

import static dev.bstk.wfinance.core.helper.Constantes.FormatoData.DD_MM_YYYY;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NovoLancamentoRequest {

    @NotNull
    private String descricao;

    @NotNull
    @JsonFormat(pattern = DD_MM_YYYY)
    private LocalDate dataVencimento;

    @JsonFormat(pattern = DD_MM_YYYY)
    private LocalDate dataPagamento;

    @NotNull
    private BigDecimal valor;
    private String observacao;

    @NotNull
    private Tipo tipo;

    @NotNull
    private LancamentoCategoriaRequest categoria;

    @NotNull
    private LancamentoPessoaRequest pessoa;

}
