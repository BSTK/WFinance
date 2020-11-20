package dev.bstk.wfinance.lancamento.domain;

import dev.bstk.wfinance.lancamento.api.request.NovoLancamentoRequest;
import dev.bstk.wfinance.lancamento.api.response.LancamentoResponse;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.apache.commons.collections4.CollectionUtils.isEmpty;

public class LancamentoMapper {

    private static final ModelMapper mapper = new ModelMapper();

    private LancamentoMapper() { }

    public static Lancamento entidade(final NovoLancamentoRequest request) {
        if (Objects.isNull(request)) {
            throw new IllegalArgumentException("NovoLancamentoRequest não pode ser nulo");
        }

        return mapper.map(request, Lancamento.class);
    }

    public static Lancamento entidade(final LancamentoResponse response) {
        if (Objects.isNull(response)) {
            throw new IllegalArgumentException("LancamentoResponse não pode ser nulo");
        }

        return mapper.map(response, Lancamento.class);
    }

    public static List<Lancamento> entidade(final List<LancamentoResponse> responses) {
        if (isEmpty(responses)) {
            return Collections.emptyList();
        }

        return responses
            .stream()
            .map(response -> mapper.map(response, Lancamento.class))
            .collect(Collectors.toList());
    }

    public static LancamentoResponse response(final Lancamento lancamento) {
        if (Objects.isNull(lancamento)) {
            throw new IllegalArgumentException("Lancamento não pode ser nulo");
        }

        return mapper.map(lancamento, LancamentoResponse.class);
    }

    public static List<LancamentoResponse> response(final List<Lancamento> lancamentos) {
        if (isEmpty(lancamentos)) {
            return Collections.emptyList();
        }

        return lancamentos
            .stream()
            .map(lancamento -> mapper.map(lancamento, LancamentoResponse.class))
            .collect(Collectors.toList());
    }

    public static Page<LancamentoResponse> response(final Page<Lancamento> lancamentos) {
        final var lancamentosResponse = response(lancamentos.getContent());
        return new PageImpl<>(lancamentosResponse,
                              lancamentos.getPageable(),
                              lancamentosResponse.size());
    }
}
