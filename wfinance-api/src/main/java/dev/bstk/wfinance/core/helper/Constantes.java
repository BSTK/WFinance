package dev.bstk.wfinance.core.helper;

public final class Constantes {

    public static final class FormatoData {
        public static final String DD_MM_YYYY = "dd-MM-yyyy";
    }

    public static final class SchedulesCron {
        public static final String EXECUTAR_TODO_DIA_AS_6_HORAS_DA_MANHA = "0 0 6 * * *";
    }

    public static final class Permissoes {
        public static final String ROLE_PESQUISAR_LANCAMENTO = "ROLE_PESQUISAR_LANCAMENTO";
    }

    public static final class EmailTemplate {
        public static final String EMAIL_AVISO_LANCAMENTOS_VENCIDOS = "email/aviso-lancamentos-vencidos";
    }

}
