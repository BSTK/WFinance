package dev.bstk.wfinance.lancamento.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class LancamentoFiltroRequest {

    private String descricao;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataVencimentoDe;

    @DateTimeFormat(pattern = "dd-MM-yyyy")
    private LocalDate dataVencimentoAte;
}
