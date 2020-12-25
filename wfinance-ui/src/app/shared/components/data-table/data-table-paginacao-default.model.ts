import {Paginacao} from "../../utils/paginacao";

export class DataTablePaginacaoDefault {

  static pagina(pagina: number = 0): Paginacao {
    return {
      pagina: pagina,
      itensPorPagina: 5
    };
  }

}
