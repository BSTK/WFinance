package dev.bstk.wfinance.lancamento.api.response;

import dev.bstk.wfinance.lancamento.domain.entidade.Tipo;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@ToString
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class ResumoLancamentoResponse {

    @EqualsAndHashCode.Include
    private Long id;

    private String descricao;
    private LocalDate dataVencimento;
    private LocalDate dataPagamento;
    private BigDecimal valor;
    private String observacao;
    private Tipo tipo;
    private String categoria;
    private String pessoa;

}
