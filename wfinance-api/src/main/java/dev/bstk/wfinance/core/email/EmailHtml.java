package dev.bstk.wfinance.core.email;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Map;

@Data
@Builder
@ToString
@AllArgsConstructor
public class EmailHtml implements Serializable {

    @NotNull
    private final Email email;

    @NotNull @NotEmpty
    private final String templateHtml;

    @NotNull @NotEmpty
    private final Map<String, Object> parametros;

}
