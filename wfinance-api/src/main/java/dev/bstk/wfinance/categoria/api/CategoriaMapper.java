package dev.bstk.wfinance.categoria.api;

import dev.bstk.wfinance.categoria.domain.Categoria;
import dev.bstk.wfinance.core.Mapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

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
        return categorias
            .stream()
            .map(categoria -> map(categoria, CategoriaResponse.class))
            .collect(Collectors.toList());
    }

    public static Page<CategoriaResponse> response(final Page<Categoria> categorias) {
        final var categoriasResponse = response(categorias.getContent());
        return new PageImpl<>(categoriasResponse,
            categorias.getPageable(),
            categorias.getTotalElements());
    }

}
