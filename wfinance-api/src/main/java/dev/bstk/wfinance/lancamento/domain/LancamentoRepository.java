package dev.bstk.wfinance.lancamento.domain;

import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

    @Query("SELECT l FROM Lancamento l WHERE l.pessoa.id = :id")
    List<Lancamento> lancamentosPorPessoa(@Param("id") final Long id);

    @Query("SELECT l FROM Lancamento l WHERE l.categoria.id = :id")
    List<Lancamento> lancamentosPorCategoria(@Param("id") final Long id);
}
