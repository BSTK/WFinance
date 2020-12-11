import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LancamentosComponent} from './pages/lancamentos/lancamentos.component';
import {RouterModule} from "@angular/router";
import {LANCAMENTOS_ROUTES} from "./lancamentos.module.routes";
import {NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {SharedModule} from "../../shared/shared.module";
import {LancamentosTabelaDadosComponent} from './componentes/lancamentos-tabela-dados/lancamentos-tabela-dados.component';
import {LancamentosPesquisaComponent} from './componentes/lancamentos-pesquisa/lancamentos-pesquisa.component';

@NgModule({
  declarations: [
    LancamentosComponent,
    LancamentosTabelaDadosComponent,
    LancamentosPesquisaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(LANCAMENTOS_ROUTES),
    NgbPaginationModule,
    NgbTooltipModule,
    SharedModule
  ]
})
export class LancamentosModule { }
