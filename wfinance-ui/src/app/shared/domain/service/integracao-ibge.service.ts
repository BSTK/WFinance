import {Observable} from 'rxjs';
import {Api} from '../../../api';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Cidade, Estado} from '../model/integracao-ibge.model';

@Injectable({
  providedIn: 'root'
})
export class IntegracaoIbgeService {
  
  constructor(private httpClient: HttpClient) {
  }
  
  estados(): Observable<Estado[]> {
    return this.httpClient.get<Estado[]>(Api.URLS.integracao.ibge.estados);
  }
  
  cidades(uf: string): Observable<Cidade[]> {
    return this.httpClient.get<Cidade[]>(`${Api.URLS.integracao.ibge.cidades}/${uf}`);
  }
  
}
