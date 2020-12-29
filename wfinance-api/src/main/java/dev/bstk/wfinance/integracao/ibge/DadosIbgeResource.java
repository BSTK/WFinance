package dev.bstk.wfinance.integracao.ibge;

import dev.bstk.wfinance.integracao.ibge.response.CidadeResponse;
import dev.bstk.wfinance.integracao.ibge.response.EstadoResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/integracao/ibge")
public class DadosIbgeResource {

    private final DadosIbgeService dadosIbgeService;

    @Autowired
    public DadosIbgeResource(final DadosIbgeService dadosIbgeService) {
        this.dadosIbgeService = dadosIbgeService;
    }

    @GetMapping("/estados")
    public ResponseEntity<List<EstadoResponse>> estados() {
        final var estados = dadosIbgeService.estados();
        return ResponseEntity.ok(estados);
    }

    @GetMapping("/estados/{UF}")
    public ResponseEntity<List<CidadeResponse>> cidades(@PathVariable("UF") final String uf) {
        final var cidades = dadosIbgeService.cidades(uf);
        return ResponseEntity.ok(cidades);
    }

}
