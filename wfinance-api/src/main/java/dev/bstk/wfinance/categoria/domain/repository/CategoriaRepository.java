package dev.bstk.wfinance.categoria.domain.repository;

import dev.bstk.wfinance.categoria.domain.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long>, CategoriaRepositoryQuery {

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Categoria c WHERE c.id = :id")
    boolean existeCategoriaCadastrada(@Param("id") final Long id);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN true ELSE false END FROM Categoria c WHERE c.nome = :nome")
    boolean existeCategoriaCadastrada(@Param("nome") final String nome);

}
