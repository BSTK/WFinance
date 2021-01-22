package dev.bstk.wfinance.core.configuracao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;

import java.util.Properties;

@Configuration
public class ConfiguracaoEmail {

    @Value("${wfinance.configuracao.email.host}")
    private String emailHost;

    /// TODO: DEFINIR UM USUARIO DE EMAIL PARA TESTES
    @Value("${wfinance.configuracao.email.usuario}")
    private String emailUsuario;

    /// TODO: DEFINIR UMA SENHA DE EMAIL PARA TESTES
    @Value("${wfinance.configuracao.email.senha}")
    private String emailSenha;


    @Bean
    public JavaMailSender sender() {
        final var properties = new Properties();
        properties.put("mail.smtp.auth", true);
        properties.put("mail.smtp.starttls.enable", true);
        properties.put("mail.smtp.connectiontimeout", 10000);
        properties.put("mail.transport.protocol", "smtp");

        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        mailSender.setHost(emailHost);
        mailSender.setPassword(emailSenha);
        mailSender.setUsername(emailUsuario);
        mailSender.setJavaMailProperties(properties);

        return mailSender;
    }
}
