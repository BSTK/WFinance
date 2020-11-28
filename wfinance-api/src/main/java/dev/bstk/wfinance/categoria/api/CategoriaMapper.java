package dev.bstk.wfinance.categoria.api;

import dev.bstk.wfinance.categoria.domain.Categoria;
import dev.bstk.wfinance.core.Mapper;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static org.apache.commons.collections4.CollectionUtils.isEmpty;

public class CategoriaMapper extends Mapper {

    public static Categoria entidade(final NovaCategoriaRequest request) {
        Objects.requireNonNull(request, "NovaCategoriaRequest não pode ser nulo");
        return map(request, Categoria.class);
    }

    public static Categoria entidade(final CategoriaResponse response) {
        Objects.requireNonNull(response, "CategoriaResponse não pode ser nulo");
        return map(response, Categoria.class);
    }

    public static CategoriaResponse response(final Categoria categoria) {
        Objects.requireNonNull(categoria, "Categoria não pode ser nulo");
        return map(categoria, CategoriaResponse.class);
    }

    public static List<CategoriaResponse> response(final List<Categoria> categorias) {
        if (isEmpty(categorias)) { return Collections.emptyList(); }

        return categorias
            .stream()
            .map(categoria -> map(categoria, CategoriaResponse.class))
            .collect(Collectors.toList());
    }

}
