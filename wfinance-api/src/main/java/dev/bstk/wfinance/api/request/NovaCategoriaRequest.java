package dev.bstk.wfinance.api.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class NovaCategoriaRequest {

    @NotNull
    @NotEmpty
    @Size(min = 5, max = 100)
    private String nome;
}
