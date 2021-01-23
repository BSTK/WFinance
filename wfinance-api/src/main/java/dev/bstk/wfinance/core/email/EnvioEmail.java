package dev.bstk.wfinance.core.email;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import javax.mail.MessagingException;
import java.util.Date;
import java.util.Locale;
import java.util.Map;

@Slf4j
@Component
public class EnvioEmail {

    private final JavaMailSender mailSender;
    private final TemplateEngine templateEngine;

    @Autowired
    public EnvioEmail(final JavaMailSender mailSender,
                      final TemplateEngine templateEngine) {
        this.mailSender = mailSender;
        this.templateEngine = templateEngine;
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

    public void enviar(final Email email, final String templateHtml, final Map<String, Object> parametros) {
        final var context = new Context(Locale.forLanguageTag("pt_BR"));
        parametros.forEach(context::setVariable);

        final var emailMensagemHtml = templateEngine.process(templateHtml, context);
        final var emailComHtml = new Email(
            email.getAssunto(),
            email.getRemetente(),
            emailMensagemHtml,
            email.getDestinatarios()
        );

        enviar(emailComHtml);
    }

}
