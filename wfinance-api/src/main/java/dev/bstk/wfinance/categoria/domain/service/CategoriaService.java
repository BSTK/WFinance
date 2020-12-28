package dev.bstk.wfinance.categoria.domain.service;

import dev.bstk.wfinance.categoria.domain.Categoria;
import dev.bstk.wfinance.categoria.domain.repository.CategoriaRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;

    @Autowired
    public CategoriaService(final CategoriaRepository categoriaRepository) {
        this.categoriaRepository = categoriaRepository;
    }

    public Page<Categoria> categorias(final String nome, final Pageable pageable) {
        return StringUtils.isEmpty(nome)
            ? categoriaRepository.findAll(pageable)
            : categoriaRepository.filtar(pageable, nome);
    }
}
