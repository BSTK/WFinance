import {environment} from "../environments/environment";

export const HTTP_HEADER_AUTHORIZATION = 'Authorization';
export const HTTP_HEADER_BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNjE3OTQyNzU4LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiI0M2UxYzM1YS1jOGI5LTQ5YmItOTkzMC05MDRiNzEwNzY4NDIiLCJlbWFpbCI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJjbGllbnRfaWQiOiJ3ZWItYW5ndWxhciJ9.LLnCl5KgnsHSLA8IRpvz6AFVm8nJt4wBeaWBkBDe03Q';

export class Api {

  static url(path: string | string[]) {
    return environment.httpLocalhost
      .concat(environment.httpWfinanceApiV1)
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
    },

    categorias: {
      categorias: Api.url('/categorias'),
      novaCategoria: Api.url('/categorias'),
    },
  });

}
