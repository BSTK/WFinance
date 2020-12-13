export const HTTP_HEADER_AUTHORIZATION = 'Authorization';
export const HTTP_HEADER_BEARER_TOKEN = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJhZG1pbkBhbGdhbW9uZXkuY29tIiwic2NvcGUiOlsicmVhZCIsIndyaXRlIl0sIm5vbWUiOiJBZG1pbmlzdHJhZG9yIiwiZXhwIjoxNjE3ODEyNzM3LCJhdXRob3JpdGllcyI6WyJST0xFX0NBREFTVFJBUl9DQVRFR09SSUEiLCJST0xFX1BFU1FVSVNBUl9QRVNTT0EiLCJST0xFX1JFTU9WRVJfUEVTU09BIiwiUk9MRV9DQURBU1RSQVJfTEFOQ0FNRU5UTyIsIlJPTEVfUEVTUVVJU0FSX0xBTkNBTUVOVE8iLCJST0xFX1JFTU9WRVJfTEFOQ0FNRU5UTyIsIlJPTEVfQ0FEQVNUUkFSX1BFU1NPQSIsIlJPTEVfUEVTUVVJU0FSX0NBVEVHT1JJQSJdLCJqdGkiOiIzOWYwOWUxYi0wM2U2LTRmM2YtOTBlZi1jMDk4ZjM0OWQ0N2IiLCJlbWFpbCI6ImFkbWluQGFsZ2Ftb25leS5jb20iLCJjbGllbnRfaWQiOiJ3ZWItYW5ndWxhciJ9.x3u06-_RpDkhKnZtKrK_09ufaxySpbZ7YyyfhabXO8c';

export class AppApi {

  private static readonly HTTP_LOCALHOST = 'http://localhost:8080';
  private static readonly HTTP_WFINANCE_API_V1 = '/wfinance/api/v1';

  static api(path: string) {
    return this.HTTP_LOCALHOST
      .concat(this.HTTP_WFINANCE_API_V1)
      .concat(path);
  }

  static readonly API = {
    lancamentos: {
      lancamentos: AppApi.api('/lancamentos'),
      resumo: AppApi.api('/lancamentos?resumo'),
      novoLancamento: AppApi.api('/lancamentos'),
    },

    fornecedores: {
      fornecedores: AppApi.api('/pessoas'),
      novoFornecedor: AppApi.api('/pessoas'),
    },

    categorias: {
      categorias: AppApi.api(''),
      novaCategoria: AppApi.api(''),
    },
  };

}
