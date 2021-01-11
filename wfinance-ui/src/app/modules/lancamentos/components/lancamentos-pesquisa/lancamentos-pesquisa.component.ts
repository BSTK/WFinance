import {Router} from '@angular/router';
import {LancamentosFiltro} from './lancamentos-filtro.model';
import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {navigationExtras} from '../../../../shared/router/router-navigation';

@Component({
  selector: 'wf-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.scss']
})
export class LancamentosPesquisaComponent implements OnInit {

  readonly filtro: LancamentosFiltro = new LancamentosFiltro();

  @Output()
  readonly eventPesquisar: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router) { }

  ngOnInit(): void { }

  pesquisar() {
    this.router.navigate([], navigationExtras(this.filtro));
    this.eventPesquisar.emit(this.filtro);
  }

}
