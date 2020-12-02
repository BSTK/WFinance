package dev.bstk.wfinance.lancamento.domain.projecao;

import dev.bstk.wfinance.lancamento.domain.entidade.Tipo;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.RequiredArgsConstructor;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;

@Data
@ToString
@RequiredArgsConstructor
public class ResumoLancamento {

    @EqualsAndHashCode.Include
    private final Long id;

    private final String descricao;
    private final LocalDate dataVencimento;
    private final LocalDate dataPagamento;
    private final BigDecimal valor;
    private final String observacao;
    private final Tipo tipo;
    private final String categoria;
    private final String pessoa;

}
