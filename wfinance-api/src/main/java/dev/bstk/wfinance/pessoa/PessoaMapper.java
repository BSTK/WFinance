package dev.bstk.wfinance.pessoa;

import dev.bstk.wfinance.core.Mapper;
import dev.bstk.wfinance.pessoa.api.request.NovaPessoaRequest;
import dev.bstk.wfinance.pessoa.api.response.PessoaResponse;
import dev.bstk.wfinance.pessoa.api.response.PessoaResumoResponse;
import dev.bstk.wfinance.pessoa.domain.entidade.Pessoa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

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

    public static List<PessoaResumoResponse> resumo(final List<Pessoa> pessoas) {
        if (isEmpty(pessoas)) { return Collections.emptyList(); }

        return pessoas
            .stream()
            .map(pessoa -> map(pessoa, PessoaResumoResponse.class))
            .collect(Collectors.toList());
    }

    public static Page<PessoaResponse> response(final Page<Pessoa> pessoas) {
        final var pessoasResponse = response(pessoas.getContent());
        return new PageImpl<>(pessoasResponse,
            pessoas.getPageable(),
            pessoas.getTotalElements());
    }

}
