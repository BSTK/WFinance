package dev.bstk.wfinance.integracao.ibge;

import dev.bstk.wfinance.core.helper.CollectionHelper;
import dev.bstk.wfinance.integracao.core.exception.IntegracaoException;
import dev.bstk.wfinance.integracao.ibge.response.CidadeResponse;
import dev.bstk.wfinance.integracao.ibge.response.EstadoResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
public class DadosIbgeService {

    private final RestTemplate template;

    @Autowired
    public DadosIbgeService(final RestTemplate template) {
        this.template = template;
    }

    /// TODO: REFATORAR PARA URL EM ARQUIVO PROPERTIES
    public List<EstadoResponse> estados() throws IntegracaoException {
        String estadosUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados";
        try {
            final EstadoResponse[] estados = template.getForObject(estadosUrl, EstadoResponse[].class);

            return CollectionHelper.isEmpty(estados)
                ? Collections.emptyList()
                : Arrays.asList(estados);
        } catch (HttpClientErrorException ex) {
            log.error("Não foi possível buscar estados", ex);
            throw new IntegracaoException(estadosUrl, ex.getMessage());
        }
    }

    /// TODO: REFATORAR PARA URL EM ARQUIVO PROPERTIES
    public List<CidadeResponse> cidades(final String uf) throws IntegracaoException {
        String cidadesUrl = "https://servicodados.ibge.gov.br/api/v1/localidades/estados/SP/distritos";
        try {
            final CidadeResponse[] cidades = template.getForObject(cidadesUrl, CidadeResponse[].class);

            return CollectionHelper.isEmpty(cidades)
                ? Collections.emptyList()
                : Arrays.asList(cidades);
        } catch (HttpClientErrorException ex) {
            log.error("Não foi possível buscar cidades", ex);
            throw new IntegracaoException(cidadesUrl, ex.getMessage());
        }
    }

}
