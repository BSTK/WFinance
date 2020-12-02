package dev.bstk.wfinance.usuario.domain;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class UsuarioService implements UserDetailsService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public UsuarioService(final UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        final var usuario = usuarioRepository.buscarPorEmail(email);

        if (Objects.isNull(usuario)) {
            throw new UsernameNotFoundException("Usuário ou Senha inválido!");
        }

        final var permissoes = usuario.getPermissoes().stream()
            .map(permissao -> new SimpleGrantedAuthority(permissao.getDescricao().toUpperCase()))
            .collect(Collectors.toSet());

        return new User(usuario.getEmail(), usuario.getSenha(), permissoes);
    }
}
