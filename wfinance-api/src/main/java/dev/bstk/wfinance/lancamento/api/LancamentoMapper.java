package dev.bstk.wfinance.lancamento.api;

import dev.bstk.wfinance.core.Mapper;
import dev.bstk.wfinance.lancamento.api.request.AtualizarLancamentoRequest;
import dev.bstk.wfinance.lancamento.api.request.NovoLancamentoRequest;
import dev.bstk.wfinance.lancamento.api.response.LancamentoResponse;
import dev.bstk.wfinance.lancamento.api.response.ResumoLancamentoResponse;
import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import dev.bstk.wfinance.lancamento.domain.projecao.ResumoLancamento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.apache.commons.collections4.CollectionUtils.isEmpty;

public class LancamentoMapper extends Mapper {

    public static Lancamento entidade(final NovoLancamentoRequest request) {
        Objects.requireNonNull(request, "NovoLancamentoRequest não pode ser nulo");
        return map(request, Lancamento.class);
    }

    public static Lancamento entidade(final AtualizarLancamentoRequest request, final Long id) {
        Objects.requireNonNull(id, "Id não pode ser nulo");
        Objects.requireNonNull(request, "AtualizarLancamentoRequest não pode ser nulo");
        final Lancamento lancamento = map(request, Lancamento.class);
        lancamento.setId(id);

        return lancamento;
    }

    public static Lancamento entidade(final LancamentoResponse response) {
        Objects.requireNonNull(response, "LancamentoResponse não pode ser nulo");
        return map(response, Lancamento.class);
    }

    public static LancamentoResponse response(final Lancamento lancamento) {
        Objects.requireNonNull(lancamento, "Lancamento não pode ser nulo");
        return map(lancamento, LancamentoResponse.class);
    }

    public static List<Lancamento> entidade(final List<LancamentoResponse> responses) {
        if (isEmpty(responses)) { return Collections.emptyList(); }

        return responses
            .stream()
            .map(response -> map(response, Lancamento.class))
            .collect(Collectors.toList());
    }

    public static List<LancamentoResponse> response(final List<Lancamento> lancamentos) {
        if (isEmpty(lancamentos)) { return Collections.emptyList(); }

        return lancamentos
            .stream()
            .map(lancamento -> map(lancamento, LancamentoResponse.class))
            .collect(Collectors.toList());
    }

    public static Page<LancamentoResponse> response(final Page<Lancamento> lancamentos) {
        final var lancamentosResponse = response(lancamentos.getContent());
        return new PageImpl<>(lancamentosResponse,
                              lancamentos.getPageable(),
                              lancamentos.getTotalElements());
    }

    public static Page<ResumoLancamentoResponse> responseResumo(final Page<ResumoLancamento> lancamentos) {
        final var resumoLancamentos = lancamentos.getContent();

        List<ResumoLancamentoResponse> resumoLancamentosResponse = new ArrayList<>();

        for (ResumoLancamento resumoLancamento : resumoLancamentos) {
            ResumoLancamentoResponse response = map(resumoLancamento, ResumoLancamentoResponse.class);
            response.setCategoria(resumoLancamento.getCategoria());
            response.setPessoa(resumoLancamento.getPessoa());
            resumoLancamentosResponse.add(response);
        }

        return new PageImpl<>(resumoLancamentosResponse,
                              lancamentos.getPageable(),
                              resumoLancamentosResponse.size());
    }
}
