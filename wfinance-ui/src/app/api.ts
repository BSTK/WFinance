import {environment} from "../environments/environment";

export const HTTP_HEADER_AUTHORIZATION = 'Authorization';
export const HTTP_HEADER_BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNjE5MjAwODY1LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSIsIlJPTEVfUkVNT1ZFUl9DQVRFR09SSUEiXSwianRpIjoiYTFiY2UyOGQtMjVkOC00ZTQyLTg5ZjYtN2EzYWM5NDQwMzQyIiwiZW1haWwiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwiY2xpZW50X2lkIjoid2ViLWFuZ3VsYXIifQ.iQBMbtmne3Evau6ZGp5kwvvXaHDOtkGh5OQ7vQxOeYE';

export const HTTP_HEADER_CONTENT_TYPE = 'Content-Type';
export const HTTP_HEADER_APPLICATION_JSON = 'application/json';
export const HTTP_HEADER_APPLICATION_FORM_URLENCODED = 'application/x-www-form-urlencoded';

export class Api {

  static url(path: string | string[]) {
    return environment.httpLocalhost
      .concat(environment.httpWfinanceApiV1)
      .concat(...path);
  }

  static oauth(path: string | string[]) {
    return environment.httpLocalhost
      .concat(environment.httpWfinanceApiOAuth)
      .concat(...path);
  }

  static readonly URLS = Object.freeze({
    lancamentos: {
      lancamentos: Api.url('/lancamentos'),
      resumo: Api.url('/lancamentos?resumo'),
      novoLancamento: Api.url('/lancamentos'),
    },

    /// TODO: REFATORAR 'pessoas' PARA 'fornecedores'
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
    }
  });

}
