import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {ColorPickerModule} from "ngx-color-picker";
import {SharedModule} from "../../shared/shared.module";
import {CATEGORIAS_ROUTES} from "./categorias.module.routes";
import {CategoriasComponent} from './pages/categorias/categorias.component';
import {NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {CategoriasCadastroComponent} from './pages/categorias-cadastro/categorias-cadastro.component';
import {CategoriasPesquisaComponent} from './components/categorias-pesquisa/categorias-pesquisa.component';
import {CategoriasTabelaDadosComponent} from './components/categorias-tabela-dados/categorias-tabela-dados.component';

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
    NgbTooltipModule,
    ColorPickerModule,
    NgbPaginationModule,
    RouterModule.forChild(CATEGORIAS_ROUTES)
  ]
})
export class CategoriasModule { }
