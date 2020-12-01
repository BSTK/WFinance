package dev.bstk.wfinance.pessoa;

import dev.bstk.wfinance.core.Mapper;
import dev.bstk.wfinance.pessoa.api.request.NovaPessoaRequest;
import dev.bstk.wfinance.pessoa.api.response.PessoaResponse;
import dev.bstk.wfinance.pessoa.domain.entidade.Pessoa;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.apache.commons.collections4.CollectionUtils.isEmpty;

public class PessoaMapper extends Mapper {

    public static Pessoa entidade(final NovaPessoaRequest request) {
        Objects.requireNonNull(request, "NovaPessoaRequest não pode ser nulo");
        return map(request, Pessoa.class);
    }

    public static Pessoa entidade(final PessoaResponse response) {
        Objects.requireNonNull(response, "PessoaResponse não pode ser nulo");
        return map(response, Pessoa.class);
    }

    public static PessoaResponse response(final Pessoa categoria) {
        Objects.requireNonNull(categoria, "Pessoa não pode ser nulo");
        return map(categoria, PessoaResponse.class);
    }

    public static List<PessoaResponse> response(final List<Pessoa> pessoas) {
        if (isEmpty(pessoas)) { return Collections.emptyList(); }

        return pessoas
            .stream()
            .map(pessoa -> map(pessoa, PessoaResponse.class))
            .collect(Collectors.toList());
    }

}
