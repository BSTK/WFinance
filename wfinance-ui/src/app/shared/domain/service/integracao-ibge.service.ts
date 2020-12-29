import {Observable} from "rxjs";
import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Cidade, Estado} from "../model/integracao-ibge.model";
import {Api, HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN} from "../../../api";

@Injectable({
  providedIn: 'root'
})
export class IntegracaoIbgeService {

  constructor(private httpClient: HttpClient) { }

  estados(): Observable<Estado[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.get<Estado[]>(Api.URLS.integracao.ibge.estados, { headers });
  }

  cidades(uf: string): Observable<Cidade[]> {
    const headers = new HttpHeaders()
      .append(HTTP_HEADER_AUTHORIZATION, HTTP_HEADER_BEARER_TOKEN);

    return this.httpClient.get<Cidade[]>(`${Api.URLS.integracao.ibge.cidades}/${uf}`, { headers });
  }

}
