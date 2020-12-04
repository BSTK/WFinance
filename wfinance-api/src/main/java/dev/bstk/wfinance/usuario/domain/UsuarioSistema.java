package dev.bstk.wfinance.usuario.domain;

import dev.bstk.wfinance.usuario.domain.entidade.Usuario;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

public class UsuarioSistema extends User {

    private final Usuario usuario;

    public UsuarioSistema(final Usuario usuario,
                          final Collection<? extends GrantedAuthority> authorities) {
        super(usuario.getEmail(), usuario.getSenha(), authorities);
        this.usuario = usuario;
    }

    public Usuario getUsuario() {
        return usuario;
    }
}
