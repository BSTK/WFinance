package dev.bstk.wfinance.api;

import dev.bstk.wfinance.api.request.NovaCategoriaRequest;
import dev.bstk.wfinance.api.response.CategoriaResponse;
import dev.bstk.wfinance.core.evento.NovoRecursoCriadoEvento;
import dev.bstk.wfinance.domain.entidade.Categoria;
import dev.bstk.wfinance.domain.repository.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/categorias")
public class CategoriaResource {

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private ApplicationEventPublisher applicationEventPublisher;

    @GetMapping
    public ResponseEntity<List<CategoriaResponse>> categorias() {
        final var categorias = categoriaRepository.findAll();
        final var categoriasResponse = categorias.stream()
            .map(categoria -> new CategoriaResponse(
                categoria.getId(),
                categoria.getNome()))
            .collect(Collectors.toList());

        return ResponseEntity.ok(categoriasResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CategoriaResponse> categoriaPorId(@PathVariable("id") final Long id) {
        final Optional<Categoria> categoriaPorId = categoriaRepository.findById(id);

        if (categoriaPorId.isPresent()) {
            final var categoria = categoriaPorId.get();
            final var categoriaResponse = new CategoriaResponse(
                categoria.getId(),
                categoria.getNome());
            return ResponseEntity.ok(categoriaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<CategoriaResponse> novaCategoria(
        @RequestBody @Valid final NovaCategoriaRequest request,
        final HttpServletResponse httpServletResponse) {

        final var categoriaSalva = categoriaRepository.save(new Categoria(request.getNome()));
        final var categoriaResponse = new CategoriaResponse(
            categoriaSalva.getId(),
            categoriaSalva.getNome());

        applicationEventPublisher.publishEvent(new NovoRecursoCriadoEvento(
            this, httpServletResponse, categoriaSalva.getId()
        ));

        return ResponseEntity.ok(categoriaResponse);
    }
}
