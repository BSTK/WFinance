package dev.bstk.wfinance.core.seguranca;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Slf4j
public class GerarSenhaUtil {

    public static void main(String[] args) {
        final var bcrypt = new BCryptPasswordEncoder();
        log.info("Senha: {}", bcrypt.encode("web-angular-pwd"));
    }
}
