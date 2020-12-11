import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {LancamentosFiltro} from "./lancamentos-filtro.model";

@Component({
  selector: 'wf-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss']
})
export class LancamentosPesquisaComponent implements OnInit {

  readonly QUANTIDADE_LETRA_PESQUISA = 3;
  readonly filtroDados: LancamentosFiltro = new LancamentosFiltro();

  @Output()
  readonly buscarLancamentos: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  buscarDados() {
    if (this.filtroValido()) {
      this.buscarLancamentos.emit(this.filtroDados);
    }
  }

  private filtroValido() {
    return this.filtroDados.descricao !== ''
        && this.filtroDados.descricao.length >= this.QUANTIDADE_LETRA_PESQUISA;
  }

}
