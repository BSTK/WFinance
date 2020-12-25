import {Paginacao} from "../../utils/paginacao";

export class DataTablePaginacaoDefault {

  static paginacao(pagina: number): Paginacao {
    return {
      pagina: pagina,
      itensPorPagina: 5
    };
  }

}
