import {LancamentosFiltro} from "./lancamentos-filtro.model";
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wf-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss']
})
export class LancamentosPesquisaComponent implements OnInit {

  readonly filtro: LancamentosFiltro = new LancamentosFiltro();

  @Output()
  readonly buscarLancamentos: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  buscarDados() {
    this.buscarLancamentos.emit(this.filtro);
  }

}
