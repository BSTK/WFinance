package dev.bstk.wfinance.lancamento.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

import static dev.bstk.wfinance.core.helper.Constantes.FormatoData.DD_MM_YYYY;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LancamentoFiltroRequest {

    private String descricao;

    @DateTimeFormat(pattern = DD_MM_YYYY)
    private LocalDate dataVencimentoDe;

    @DateTimeFormat(pattern = DD_MM_YYYY)
    private LocalDate dataVencimentoAte;
}
