package dev.bstk.wfinance.integracao.ibge;

import dev.bstk.wfinance.core.exception.IntegracaoException;
import dev.bstk.wfinance.core.helper.CollectionHelper;
import dev.bstk.wfinance.integracao.ibge.response.CidadeResponse;
import dev.bstk.wfinance.integracao.ibge.response.EstadoResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

@Slf4j
@Service
public class DadosIbgeService {

    private final RestTemplate template;

    @Value("${wfinance.integracao.ibge.url.estados}")
    private String estadosUrl;

    @Value("${wfinance.integracao.ibge.url.cidades}")
    private String cidadesUrl;

    @Autowired
    public DadosIbgeService(final RestTemplate template) {
        this.template = template;
    }

    public List<EstadoResponse> estados() throws IntegracaoException {
        try {
            final EstadoResponse[] estados = template.getForObject(estadosUrl, EstadoResponse[].class);
            final List<EstadoResponse> estadosReponse = CollectionHelper.isEmpty(estados)
                                            ? new ArrayList<>()
                                            : Arrays.asList(estados);

            estadosReponse.sort(Comparator.comparing(EstadoResponse::getSigla));

            return estadosReponse;
        } catch (HttpClientErrorException ex) {
            log.error("Não foi possível buscar estados", ex);
            throw new IntegracaoException(estadosUrl, ex.getMessage());
        }
    }

    public List<CidadeResponse> cidades(final String uf) throws IntegracaoException {
        try {
            final CidadeResponse[] cidades = template.getForObject(cidadesUrl.replace("$UF", uf), CidadeResponse[].class);
            final List<CidadeResponse> cidadeResponse = CollectionHelper.isEmpty(cidades)
                                            ? new ArrayList<>()
                                            : Arrays.asList(cidades);

            cidadeResponse.sort(Comparator.comparing(CidadeResponse::getNome));

            return cidadeResponse;
        } catch (HttpClientErrorException ex) {
            log.error("Não foi possível buscar cidades", ex);
            throw new IntegracaoException(cidadesUrl, ex.getMessage());
        }
    }

}
