import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {CATEGORIAS_ROUTES} from "./categorias.module.routes";
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";
import {CategoriasComponent} from './pages/categorias/categorias.component';
import {CategoriasCadastroComponent} from './pages/categorias-cadastro/categorias-cadastro.component';
import {CategoriasPesquisaComponent} from './componentes/categorias-pesquisa/categorias-pesquisa.component';
import {CategoriasTabelaDadosComponent} from './componentes/categorias-tabela-dados/categorias-tabela-dados.component';

@NgModule({
  declarations: [
    CategoriasComponent,
    CategoriasCadastroComponent,
    CategoriasPesquisaComponent,
    CategoriasTabelaDadosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgbPaginationModule,
    RouterModule.forChild(CATEGORIAS_ROUTES),
  ]
})
export class CategoriasModule { }
