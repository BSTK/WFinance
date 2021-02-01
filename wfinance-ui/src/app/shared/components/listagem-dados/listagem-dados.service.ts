import {Paginacao} from '..';
import {Observable} from 'rxjs';

export interface ListagemDadosService {
  
  carregar(paginacao: Paginacao): Observable<any[]>;
  
  resumo(filtro: any, paginacao: Paginacao): Observable<any[]>
  
}
