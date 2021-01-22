package dev.bstk.wfinance.lancamento.schedule;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import static dev.bstk.wfinance.core.helper.Constantes.SchedulesCron.EXECUTAR_TODO_DIA_AS_6_HORAS_DA_MANHA;

@Component
public class LancamentoScheduleLancamentosVencidos {

    @Scheduled(cron = EXECUTAR_TODO_DIA_AS_6_HORAS_DA_MANHA)
    public void executar() {
        System.out.println(">>>>>> LancamentoScheduleLancamentosVencidos <<<<<<<");
    }

}
