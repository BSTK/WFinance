package dev.bstk.wfinance.lancamento.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotNull;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NovoLancamentoPessoaRequest {

    @NotNull
    private Long id;

}
