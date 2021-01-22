package dev.bstk.wfinance.core.email;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import javax.mail.MessagingException;
import java.util.Date;

@Slf4j
@Component
public class EnvioEmail {

    private final JavaMailSender mailSender;

    @Autowired
    public EnvioEmail(final JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void enviar(final Email email) {
        try {
            final var mimeMessage = mailSender.createMimeMessage();
            final var messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");
            messageHelper.setSentDate(new Date());
            messageHelper.setFrom(email.getRemetente());
            messageHelper.setSubject(email.getAssunto());
            messageHelper.setText(email.getMenssagem(), true);
            messageHelper.setTo(email.getDestinatarios().toArray(new String[0]));

            mailSender.send(mimeMessage);
        } catch (MessagingException ex) {
            log.error("Nao foi possivél enviar email. Ex = {}", ex.getMessage(), ex);
            throw new RuntimeException(ex);
        }
    }

}
