import {Router} from "@angular/router";
import {PessoasFiltro} from "../../domain/pessoa.model";
import {navigationExtras} from "../../../../shared/router";
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'wf-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.scss']
})
export class PessoasPesquisaComponent {

  readonly filtro: PessoasFiltro = new PessoasFiltro();

  @Output()
  readonly eventPesquisar: EventEmitter<PessoasFiltro> = new EventEmitter<PessoasFiltro>();

  constructor(private readonly router: Router) { }

  pesquisar() {
    this.router.navigate([], navigationExtras(this.filtro));
    this.eventPesquisar.emit(this.filtro);
  }

}
