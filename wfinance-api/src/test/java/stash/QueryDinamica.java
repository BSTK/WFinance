package stash;

import dev.bstk.wfinance.lancamento.api.request.LancamentoFiltroRequest;
import org.apache.commons.lang3.StringUtils;

import java.time.LocalDate;

import static java.util.Objects.nonNull;

public class QueryDinamica {

    public static void main(String[] args) {
        LancamentoFiltroRequest requestA = new LancamentoFiltroRequest("AAA", LocalDate.now(), LocalDate.now());
        LancamentoFiltroRequest requestB = new LancamentoFiltroRequest("", null, null);
        LancamentoFiltroRequest requestC = new LancamentoFiltroRequest(null, null, null);
        LancamentoFiltroRequest requestD = new LancamentoFiltroRequest("BBB", LocalDate.now(), null);
        LancamentoFiltroRequest requestE = new LancamentoFiltroRequest("CCC", null, null);
        LancamentoFiltroRequest requestF = new LancamentoFiltroRequest("", LocalDate.now(), LocalDate.now());
        LancamentoFiltroRequest requestG = new LancamentoFiltroRequest(null, LocalDate.now(), LocalDate.now());
        LancamentoFiltroRequest requestH = new LancamentoFiltroRequest("", null, LocalDate.now());
        LancamentoFiltroRequest requestJ = new LancamentoFiltroRequest(null, null, LocalDate.now());
        LancamentoFiltroRequest requestK = new LancamentoFiltroRequest("", LocalDate.now(), null);
        LancamentoFiltroRequest requestL = new LancamentoFiltroRequest(null, LocalDate.now(), null);

        System.out.println("A = " + formatarQuery(requestA));
        System.out.println("B = " + formatarQuery(requestB));
        System.out.println("C = " + formatarQuery(requestC));
        System.out.println("D = " + formatarQuery(requestD));
        System.out.println("E = " + formatarQuery(requestE));
        System.out.println("F = " + formatarQuery(requestF));
        System.out.println("G = " + formatarQuery(requestG));
        System.out.println("G = " + formatarQuery(requestH));
        System.out.println("J = " + formatarQuery(requestJ));
        System.out.println("K = " + formatarQuery(requestK));
        System.out.println("L = " + formatarQuery(requestL));
    }

    private static String formatarQuery(LancamentoFiltroRequest request) {
        String query = "SELECT l FROM Lancamento l";

        if (StringUtils.isNotEmpty(request.getDescricao())) {
            query += " WHERE UPPER(l.descricao) = UPPER(:descricao)%";

            if (nonNull(request.getDataVencimentoDe())) {
                query += " AND l.dataVencimentoDe   = :dataVencimentoDe";
            }

            if (nonNull(request.getDataVencimentoAte())) {
                query += " AND l.dataVencimentoAte  = :dataVencimentoAte";
            }

            return query;
        }

        if (nonNull(request.getDataVencimentoDe())) {
            query += " WHERE l.dataVencimentoDe = :dataVencimentoDe";

            if (nonNull(request.getDataVencimentoAte())) {
                query += " AND l.dataVencimentoAte = :dataVencimentoAte";
            }

            return query;
        }

        if (nonNull(request.getDataVencimentoAte())) {
            query += " WHERE l.dataVencimentoAte = :dataVencimentoAte";
        }

        return query;
    }
}
