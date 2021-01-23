package dev.bstk.wfinance.lancamento.domain.repository;

import dev.bstk.wfinance.lancamento.domain.entidade.Lancamento;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface LancamentoRepository extends JpaRepository<Lancamento, Long>, LancamentoRepositoryQuery {

    @Query("SELECT l FROM Lancamento l WHERE l.pessoa.id = :id")
    List<Lancamento> lancamentosPorPessoa(@Param("id") final Long id);

    @Query("SELECT l FROM Lancamento l WHERE l.categoria.id = :id")
    List<Lancamento> lancamentosPorCategoria(@Param("id") final Long id);

    @Query("SELECT l FROM Lancamento l WHERE l.dataVencimento <= :dataVencimento AND l.dataPagamento IS NULL")
    List<Lancamento> lancamentosVencidos(final LocalDate dataVencimento);

    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM Lancamento l WHERE l.categoria.id = :id")
    boolean existeLancamentoParaCategoria(@Param("id") final Long id);

    @Query("SELECT CASE WHEN COUNT(l) > 0 THEN true ELSE false END FROM Lancamento l WHERE l.pessoa.id = :id")
    boolean existeLancamentoParaPessoa(@Param("id") final Long id);

}
