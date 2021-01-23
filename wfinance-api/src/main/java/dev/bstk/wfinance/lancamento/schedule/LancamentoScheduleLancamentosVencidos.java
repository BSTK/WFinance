package dev.bstk.wfinance.lancamento.schedule;

import dev.bstk.wfinance.core.email.Email;
import dev.bstk.wfinance.core.email.EmailHtml;
import dev.bstk.wfinance.core.email.EnvioEmail;
import dev.bstk.wfinance.core.helper.CollectionHelper;
import dev.bstk.wfinance.lancamento.domain.repository.LancamentoRepository;
import dev.bstk.wfinance.usuario.domain.UsuarioRepository;
import dev.bstk.wfinance.usuario.domain.entidade.Usuario;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Map;
import java.util.stream.Collectors;

import static dev.bstk.wfinance.core.helper.Constantes.EmailTemplate.EMAIL_AVISO_LANCAMENTOS_VENCIDOS;
import static dev.bstk.wfinance.core.helper.Constantes.Permissoes.ROLE_PESQUISAR_LANCAMENTO;
import static dev.bstk.wfinance.core.helper.Constantes.SchedulesCron.EXECUTAR_TODO_DIA_AS_6_HORAS_DA_MANHA;

@Slf4j
@Component
public class LancamentoScheduleLancamentosVencidos {

    @Value("${wfinance.configuracao.email.remetente.sistema}")
    private String usuarioRemetendeSistema;

    private static final String EMAIL_PARAMETROS_LANCAMENTOS = "lancamentos";
    private static final String EMAIL_ASSUNTO = "WFinance - Lançamentos Vencidos";

    private final EnvioEmail envioEmail;
    private final UsuarioRepository usuarioRepository;
    private final LancamentoRepository lancamentoRepository;


    @Autowired
    public LancamentoScheduleLancamentosVencidos(final EnvioEmail envioEmail,
                                                 final UsuarioRepository usuarioRepository,
                                                 final LancamentoRepository lancamentoRepository) {
        this.envioEmail = envioEmail;
        this.usuarioRepository = usuarioRepository;
        this.lancamentoRepository = lancamentoRepository;
    }

    @Scheduled(cron = EXECUTAR_TODO_DIA_AS_6_HORAS_DA_MANHA)
    public void executar() {
        if (log.isDebugEnabled()) {
            log.debug("Preparando schedule para envio de email dos lançamentos vencidos");
        }

        final var lancamentosVencidos = lancamentoRepository.lancamentosVencidos(LocalDate.now());

        if (CollectionHelper.isEmpty(lancamentosVencidos)) {
            log.warn("Não há lançamentos vencidos para a data atual.");
            return;
        }

        log.debug("Existem {} lançamentos vecidos.", lancamentosVencidos.size());

        final var usuarios = usuarioRepository.buscarPorPermissao(ROLE_PESQUISAR_LANCAMENTO);

        if (CollectionHelper.isEmpty(usuarios)) {
            log.warn("Não há usuários para serem avisados.");
            return;
        }

        final var emailsDestinatarios = usuarios.stream().map(Usuario::getEmail).collect(Collectors.toList());

        final var email = Email.builder()
            .menssagem("")
            .assunto(EMAIL_ASSUNTO)
            .remetente(usuarioRemetendeSistema)
            .destinatarios(emailsDestinatarios)
            .build();

        final var emailHtml = EmailHtml.builder()
            .email(email)
            .templateHtml(EMAIL_AVISO_LANCAMENTOS_VENCIDOS)
            .parametros(Map.of(EMAIL_PARAMETROS_LANCAMENTOS, lancamentosVencidos))
            .build();

        envioEmail.enviar(emailHtml);

        if (log.isDebugEnabled()) {
            log.debug("Envio de email's concluidos. Usuários: {}",
                String.join(", ", emailsDestinatarios));
        }
    }

}
