package dev.bstk.wfinance.usuario.domain;

import dev.bstk.wfinance.usuario.domain.entidade.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    @Query("SELECT u FROM Usuario u WHERE u.email = :email")
    Usuario buscarPorEmail(@Param("email") final String email);

    @Query("SELECT u FROM Usuario u JOIN FETCH u.permissoes p WHERE p.descricao = :descricao")
    List<Usuario> buscarPorPermissao(final String descricao);
}
