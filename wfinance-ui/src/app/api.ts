import {environment} from "../environments/environment";

export class Api {

  static url(path: string | string[]) {
    return environment.httpWfinanceHost
      .concat(environment.httpWfinanceApiV1)
      .concat(...path);
  }

  static oauth(path: string | string[]) {
    return environment.httpWfinanceHost
      .concat(environment.httpWfinanceApiOAuth)
      .concat(...path);
  }

  static readonly URLS = Object.freeze({
    lancamentos: {
      lancamentos: Api.url('/lancamentos'),
      resumo: Api.url('/lancamentos?resumo'),
      novoLancamento: Api.url('/lancamentos'),
    },

    /// TODO: 1 - Refatorar 'pessoas' para 'fornecedores'
    fornecedores: {
      fornecedores: Api.url('/pessoas'),
      novoFornecedor: Api.url('/pessoas'),
      resumo: Api.url('/pessoas/resumo'),
    },

    categorias: {
      categorias: Api.url('/categorias'),
      novaCategoria: Api.url('/categorias'),
      resumo: Api.url('/categorias/resumo'),
    },

    integracao: {
      ibge: {
        estados: Api.url('/integracao/ibge/estados'),
        cidades: Api.url('/integracao/ibge/cidades'),
      }
    },

    oauth: {
      token: Api.oauth('/token'),
      logout: Api.url('/token/logout'),
    }
  });

}
