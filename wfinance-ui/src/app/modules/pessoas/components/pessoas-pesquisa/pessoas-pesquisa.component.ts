import {PessoasFiltro} from "../../domain/pessoa.model";
import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'wf-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.scss']
})
export class PessoasPesquisaComponent implements OnInit {

  readonly filtro: PessoasFiltro = new PessoasFiltro();

  @Output()
  readonly buscarPessoas: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void { }

  buscarDados() {
    this.buscarPessoas.emit(this.filtro);
  }

}
