package dev.bstk.wfinance.pessoa.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

    @Query("SELECT CASE WHEN COUNT(p) > 0 THEN true ELSE false END FROM Pessoa p "
         + "WHERE upper(p.endereco.cep)         = upper(:cep) "
         + "AND   upper(p.endereco.logradouro)  = upper(:logradouro) "
         + "AND   upper(p.endereco.numero)      = upper(:numero) ")
    boolean existeEnderecoCadastrado(@Param("cep") final String cep,
                                     @Param("logradouro") final String logradouro,
                                     @Param("numero") final String numero);

}