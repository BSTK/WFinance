import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {CATEGORIAS_ROUTES} from "./categorias.module.routes";
import {CategoriasComponent} from './pages/categorias/categorias.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { CategoriasCadastroComponent } from './pages/categorias-cadastro/categorias-cadastro.component';
import { CategoriasPesquisaComponent } from './componentes/categorias-pesquisa/categorias-pesquisa.component';
import { CategoriasTabelaDadosComponent } from './componentes/categorias-tabela-dados/categorias-tabela-dados.component';
import {NgbPaginationModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [
    CategoriasComponent,
    CategoriasCadastroComponent,
    CategoriasPesquisaComponent,
    CategoriasTabelaDadosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CATEGORIAS_ROUTES),
    FormsModule,
    SharedModule,
    NgbPaginationModule,
  ]
})
export class CategoriasModule { }
