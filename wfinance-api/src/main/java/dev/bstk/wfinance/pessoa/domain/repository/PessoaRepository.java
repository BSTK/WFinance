package dev.bstk.wfinance.pessoa.domain.repository;

import dev.bstk.wfinance.pessoa.domain.entidade.Pessoa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long>, PessoaRepositoryQuery {

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Pessoa p "
        + "WHERE UPPER(p.endereco.cep)         = UPPER(:cep) "
        + "AND   UPPER(p.endereco.logradouro)  = UPPER(:logradouro) "
        + "AND   UPPER(p.endereco.numero)      = UPPER(:numero) ")
    boolean existeEnderecoCadastrado(@Param("cep") final String cep,
                                     @Param("logradouro") final String logradouro,
                                     @Param("numero") final String numero);

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Pessoa p "
        + "WHERE TRIM(UPPER(p.nome)) = TRIM(UPPER(:nome)) ")
    boolean existePessoaCadastradaComNome(@Param("nome") final String nome);

}
