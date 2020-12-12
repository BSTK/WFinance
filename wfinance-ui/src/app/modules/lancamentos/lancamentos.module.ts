import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {SharedModule} from "../../shared/shared.module";
import {LANCAMENTOS_ROUTES} from "./lancamentos.module.routes";
import {LancamentosComponent} from './pages/lancamentos/lancamentos.component';
import {NgbButtonsModule, NgbDatepickerModule, NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {LancamentosCadastroComponent} from './pages/lancamentos-cadastro/lancamentos-cadastro.component';
import {LancamentosPesquisaComponent} from './componentes/lancamentos-pesquisa/lancamentos-pesquisa.component';
import {LancamentosTabelaDadosComponent} from './componentes/lancamentos-tabela-dados/lancamentos-tabela-dados.component';

@NgModule({
  declarations: [
    LancamentosComponent,
    LancamentosPesquisaComponent,
    LancamentosCadastroComponent,
    LancamentosTabelaDadosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgbTooltipModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    RouterModule.forChild(LANCAMENTOS_ROUTES),
    NgbButtonsModule
  ]
})
export class LancamentosModule { }
