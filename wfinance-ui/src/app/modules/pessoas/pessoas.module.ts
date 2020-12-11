import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {PESSOAS_ROUTES} from "./pessoas.module.routes";
import {SharedModule} from "../../shared/shared.module";
import {PessoasComponent} from './pages/pessoas/pessoas.component';
import {NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {PessoasPesquisaComponent} from './componentes/pessoas-pesquisa/pessoas-pesquisa.component';
import {PessoasTabelaDadosComponent} from './componentes/pessoas-tabela-dados/pessoas-tabela-dados.component';

@NgModule({
  declarations: [
    PessoasComponent,
    PessoasPesquisaComponent,
    PessoasTabelaDadosComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PESSOAS_ROUTES),
    NgbPaginationModule,
    NgbTooltipModule,
    SharedModule
  ]
})
export class PessoasModule { }
