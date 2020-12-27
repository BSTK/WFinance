import {Paginacao} from "../..";

export class DataTablePaginacaoDefault {

  static pagina(pagina: number = 0): Paginacao {
    return {
      pagina: pagina,
      itensPorPagina: 5
    };
  }

}
