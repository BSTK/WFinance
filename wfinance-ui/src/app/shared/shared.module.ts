import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CabecalhoPaginaComponent } from './cabecalho-pagina/cabecalho-pagina.component';

@NgModule({
  declarations: [
    CabecalhoPaginaComponent
  ],
  exports: [
    CabecalhoPaginaComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
