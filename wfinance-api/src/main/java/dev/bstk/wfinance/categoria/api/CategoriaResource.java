package dev.bstk.wfinance.categoria.api;

import dev.bstk.wfinance.categoria.domain.Categoria;
import dev.bstk.wfinance.categoria.domain.repository.CategoriaRepository;
import dev.bstk.wfinance.core.evento.NovoRecursoCriadoEvento;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.Optional;

import static dev.bstk.wfinance.categoria.api.CategoriaMapper.response;

@RestController
@RequestMapping("/api/v1/categorias")
public class CategoriaResource {

    private final CategoriaRepository categoriaRepository;
    private final ApplicationEventPublisher applicationEventPublisher;

    @Autowired
    public CategoriaResource(final CategoriaRepository categoriaRepository,
                             final ApplicationEventPublisher applicationEventPublisher) {
        this.categoriaRepository = categoriaRepository;
        this.applicationEventPublisher = applicationEventPublisher;
    }

    @GetMapping
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_CATEGORIA') and #oauth2.hasScope('read')")
    public ResponseEntity<Page<CategoriaResponse>> categorias(final Pageable pageable) {
        final var categorias = categoriaRepository.findAll(pageable);
        final var categoriasResponse = response(categorias);

        return ResponseEntity.ok(categoriasResponse);
    }

    @GetMapping(value = "/resumo")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_CATEGORIA') and #oauth2.hasScope('read')")
    public ResponseEntity<Page<CategoriaResponse>> categorias(@RequestParam("nome") final String nome,
                                                              final Pageable pageable) {
        final var categorias = categoriaRepository.filtar(pageable, nome);
        final var categoriasResponse = response(categorias);

        return ResponseEntity.ok(categoriasResponse);
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAuthority('ROLE_PESQUISAR_CATEGORIA') and #oauth2.hasScope('read')")
    public ResponseEntity<CategoriaResponse> categoriaPorId(@PathVariable("id") final Long id) {
        final Optional<Categoria> categoriaPorId = categoriaRepository.findById(id);

        if (categoriaPorId.isPresent()) {
            final var categoria = categoriaPorId.get();
            final var categoriaResponse = response(categoria);
            return ResponseEntity.ok(categoriaResponse);
        }

        return ResponseEntity.notFound().build();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    @PreAuthorize("hasAuthority('ROLE_CADASTRAR_CATEGORIA') and #oauth2.hasScope('write')")
    public ResponseEntity<CategoriaResponse> novaCategoria(@RequestBody @Valid final NovaCategoriaRequest request,
                                                           final HttpServletResponse httpServletResponse) {
        final var categoriaSalva = categoriaRepository.save(new Categoria(request.getNome()));
        final var categoriaResponse = response(categoriaSalva);

        applicationEventPublisher.publishEvent(new NovoRecursoCriadoEvento(
            this, httpServletResponse, categoriaSalva.getId()
        ));

        return ResponseEntity.ok(categoriaResponse);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_REMOVER_CATEGORIA') and #oauth2.hasScope('write')")
    public ResponseEntity<Void> excluir(@PathVariable("id") final Long id) {
        categoriaRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
