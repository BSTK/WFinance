import {Router} from '@angular/router';
import {navigationExtras} from '../../../../shared/router';
import {CategoriasFiltro} from './categorias-filtro.model';
import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'wf-categorias-pesquisa',
  templateUrl: './categorias-pesquisa.component.html'
})
export class CategoriasPesquisaComponent {
  
  readonly filtro: CategoriasFiltro = new CategoriasFiltro();
  
  @Output()
  readonly eventPesquisar: EventEmitter<CategoriasFiltro> = new EventEmitter<CategoriasFiltro>();
  
  constructor(private readonly router: Router) {
  }
  
  pesquisar() {
    this.router.navigate([], navigationExtras(this.filtro));
    this.eventPesquisar.emit(this.filtro);
  }
  
}
