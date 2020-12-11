import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'wf-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html'
})
export class LancamentosPesquisaComponent implements OnInit {

  @Input()
  readonly filtroDados: any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
