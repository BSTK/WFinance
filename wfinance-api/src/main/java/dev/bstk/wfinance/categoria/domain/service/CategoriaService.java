package dev.bstk.wfinance.categoria.domain.service;

import dev.bstk.wfinance.categoria.api.request.NovaCategoriaRequest;
import dev.bstk.wfinance.categoria.domain.entidade.Categoria;
import dev.bstk.wfinance.categoria.domain.repository.CategoriaRepository;
import dev.bstk.wfinance.core.exception.DadosInvalidosException;
import dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.Objects;

import static dev.bstk.wfinance.categoria.api.CategoriaMapper.entidade;

@Service
public class CategoriaService {

    private final CategoriaRepository categoriaRepository;
    private final LancamentoRepository lancamentoRepository;

    @Autowired
    public CategoriaService(final CategoriaRepository categoriaRepository,
                            final LancamentoRepository lancamentoRepository) {
        this.categoriaRepository = categoriaRepository;
        this.lancamentoRepository = lancamentoRepository;
    }

    public Page<Categoria> categorias(final String nome, final Pageable pageable) {
        return StringUtils.isEmpty(nome)
            ? categoriaRepository.findAll(pageable)
            : categoriaRepository.filtar(pageable, nome);
    }

    public Categoria novaCategoria(final NovaCategoriaRequest request) {
        boolean existeCategoriaCadastrada = categoriaRepository.existeCategoriaCadastrada(request.getNome());

        if (Objects.isNull(request.getId()) && existeCategoriaCadastrada) {
            throw new DadosInvalidosException("Categoria.Nome", request.getNome(),
                "Já existe uma Categoria cadastrada para o nome: \"" + request.getNome() + "\"");
        }

        final var categoriaNova = entidade(request);
        return categoriaRepository.save(categoriaNova);
    }

    public void excluir(final Long categoriaId) {
        final var existeLancamentoCadastrado = lancamentoRepository.existeLancamentoParaCategoria(categoriaId);

        if (existeLancamentoCadastrado) {
            throw new DadosInvalidosException("Categoria.Id", categoriaId,
                "Categoria não pode ser exluida, pois há um lancamento atrelado!");
        }

        categoriaRepository.deleteById(categoriaId);
    }
}
