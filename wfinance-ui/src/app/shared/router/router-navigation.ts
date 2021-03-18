import {isNull} from '../utils/object-utils';
import {NavigationExtras} from '@angular/router';

export enum NavigateQuery {
  NAVIGATE_QUERY_TODOS = 'todos',
  NAVIGATE_QUERY_PESQUISA = 'pesquisa',
}

const navigationExtrasTodos = (): NavigationExtras => {
  return {
    queryParams: {query: NavigateQuery.NAVIGATE_QUERY_TODOS},
    queryParamsHandling: 'merge',
    replaceUrl: true
  };
};

const navigationExtrasPesquisa = <T>(filtro: T): NavigationExtras => {
  const queryParams = {
    query: NavigateQuery.NAVIGATE_QUERY_PESQUISA
  };
  
  const keys = Object.keys(filtro);
  
  for (const key of keys) {
    queryParams[key] = filtro[key];
  }
  
  return {
    queryParams: queryParams,
    queryParamsHandling: 'merge',
    replaceUrl: true
  };
};

export const navigationExtrasPagina = (pagina: number): NavigationExtras => {
  return {
    queryParams: {pagina: pagina},
    queryParamsHandling: 'merge',
    replaceUrl: true
  };
};

export const navigationExtras = <T>(filtro: T = undefined): NavigationExtras => {
  return isNull(filtro)
    ? navigationExtrasTodos()
    : navigationExtrasPesquisa(filtro);
};
