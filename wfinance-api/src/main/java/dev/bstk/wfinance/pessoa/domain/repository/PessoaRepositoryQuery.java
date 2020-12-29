package dev.bstk.wfinance.pessoa.domain.repository;

import dev.bstk.wfinance.pessoa.domain.entidade.Pessoa;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PessoaRepositoryQuery {

    Page<Pessoa> filtar(final Pageable pageable, final String nome);
}
