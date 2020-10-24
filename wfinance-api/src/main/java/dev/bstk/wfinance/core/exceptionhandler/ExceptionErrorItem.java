package dev.bstk.wfinance.core.exceptionhandler;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@Data
@ToString
@AllArgsConstructor
public class ExceptionErrorItem {

    private String atributo;
    private String mensagem;
    private String valorInformado;

}
