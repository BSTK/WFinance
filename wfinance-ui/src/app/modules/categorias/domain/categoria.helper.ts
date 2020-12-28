import {Categoria} from "./categoria.model";
import {ConfirmDialogConfig, ConfirmDialogConfigTipo} from "../../../shared/components/dialog/confirm-dialog-config";

export const confirmDialogConfigExclusao = (categoria: Categoria): ConfirmDialogConfig => {
  return {
    titulo: 'Deseja excluir categoria?',
    texto: `Excluindo categoria "${ categoria.nome }"`,
    tipo: ConfirmDialogConfigTipo.EXCLUSAO
  };
};

/***
 * /// TODO: IMPLEMENTAR FILTRO DE CATEGORIA
export const lancamentoFiltroQueryParam = (queryParamMap: ParamMap): LancamentosFiltro => {
  return {
    descricao: queryParamMap.get('descricao'),
    dataVencimentoDe: queryParamMap.get('dataVencimentoDe'),
    dataVencimentoAte: queryParamMap.get('dataVencimentoAte')
  };
};
***/
