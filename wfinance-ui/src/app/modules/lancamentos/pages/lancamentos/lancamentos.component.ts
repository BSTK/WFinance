import {Component, OnInit} from '@angular/core';
import {Lancamento} from "../../lancamento.model";
import {LancamentosService} from "../../lancamentos.service";
import {LancamentosFiltro} from "../../componentes/lancamentos-pesquisa/lancamentos-filtro.model";

@Component({
  selector: 'app-lancamentos',
  templateUrl: './lancamentos.component.html'
})
export class LancamentosComponent implements OnInit {

  lancamentos: Lancamento[] = [];

  constructor(private lancamentosService: LancamentosService) { }

  ngOnInit() {
    this.lancamentosService
        .lancamentos()
        .subscribe((response: any) => {
          if (response && response.content) {
            this.lancamentos = response.content;
          }
        });
  }

  buscarLancamentos(filtro: LancamentosFiltro) {
    console.log('Filtro = ', filtro);

    const observable = this.filtroValido(filtro)
      ? this.lancamentosService.resumo(filtro)
      : this.lancamentosService.lancamentos();

    if (observable) {
      observable.subscribe((response: any) => {
        if (response && response.content) {
          this.lancamentos = response.content;
        }
      });
    }
  }

  private filtroValido(filtro: LancamentosFiltro) {
    return filtro
      && filtro.descricao
      && filtro.descricao !== '';
  }

}
