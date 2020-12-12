import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {PESSOAS_ROUTES} from "./pessoas.module.routes";
import {SharedModule} from "../../shared/shared.module";
import {PessoasComponent} from './pages/pessoas/pessoas.component';
import {NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {PessoasPesquisaComponent} from './componentes/pessoas-pesquisa/pessoas-pesquisa.component';
import {PessoasTabelaDadosComponent} from './componentes/pessoas-tabela-dados/pessoas-tabela-dados.component';
import { PessoasCadastroComponent } from './pages/pessoas-cadastro/pessoas-cadastro.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    PessoasComponent,
    PessoasPesquisaComponent,
    PessoasTabelaDadosComponent,
    PessoasCadastroComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PESSOAS_ROUTES),
    NgbPaginationModule,
    NgbTooltipModule,
    SharedModule,
    FormsModule
  ]
})
export class PessoasModule { }
