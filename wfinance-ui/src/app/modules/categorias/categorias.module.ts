import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {CATEGORIAS_ROUTES} from "./categorias.module.routes";
import {CategoriasComponent} from './pages/categorias/categorias.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../../shared/shared.module";
import { CategoriasCadastroComponent } from './pages/categorias-cadastro/categorias-cadastro.component';

@NgModule({
  declarations: [
    CategoriasComponent,
    CategoriasCadastroComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CATEGORIAS_ROUTES),
    FormsModule,
    SharedModule,
  ]
})
export class CategoriasModule { }
