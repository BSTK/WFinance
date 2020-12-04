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

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class AtualizarLancamentoRequest {

    @NotNull
    private String descricao;

    @NotNull
    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataVencimento;

    @JsonFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataPagamento;

    @NotNull
    private BigDecimal valor;
    private String observacao;

    @NotNull
    private Tipo tipo;

    @NotNull
    private LancamentoPessoaRequest pessoa;

    @NotNull
    private LancamentoCategoriaRequest categoria;
}
