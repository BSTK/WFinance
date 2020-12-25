import {NavigationExtras} from "@angular/router";
import {isUndefined} from "../utils/object-utils";
import {LancamentosFiltro} from "../../modules/lancamentos/components/lancamentos-pesquisa/lancamentos-filtro.model";

export enum NavigateQuery {
  NAVIGATE_QUERY_TODOS = 'todos',
  NAVIGATE_QUERY_PESQUISA = 'pesquisa'
}

const navigationExtrasTodos = (): NavigationExtras => {
  return {
    queryParams: { query: NavigateQuery.NAVIGATE_QUERY_TODOS },
    queryParamsHandling: 'merge',
    replaceUrl: true
  };
};

const navigationExtrasPesquisa = (filtro: LancamentosFiltro): NavigationExtras => {
  return {
    queryParams: {
      descricao: filtro.descricao,
      dataVencimentoDe: filtro.dataVencimentoDe,
      dataVencimentoAte: filtro.dataVencimentoAte,
      query: NavigateQuery.NAVIGATE_QUERY_PESQUISA
    },
    queryParamsHandling: 'merge',
    replaceUrl: true,
  };
};

export const navigationExtras = (filtro: LancamentosFiltro = undefined): NavigationExtras => {
  return isUndefined(filtro)
    ? navigationExtrasTodos()
    : navigationExtrasPesquisa(filtro);
};
