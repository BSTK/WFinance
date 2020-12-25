import {Paginacao} from "../../utils/paginacao";

export class DataTablePaginacaoDefault {

  static pagina(pagina: number = 1): Paginacao {
    return {
      pagina: pagina,
      itensPorPagina: 5
    };
  }

}
