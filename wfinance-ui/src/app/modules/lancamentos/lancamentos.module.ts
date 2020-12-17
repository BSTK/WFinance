import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {CurrencyMaskModule} from "ng2-currency-mask";
import {SharedModule} from "../../shared/shared.module";
import {LANCAMENTOS_ROUTES} from "./lancamentos.module.routes";
import {LancamentosComponent} from './pages/lancamentos/lancamentos.component';
import {LancamentosCadastroComponent} from './pages/lancamentos-cadastro/lancamentos-cadastro.component';
import {LancamentosPesquisaComponent} from './components/lancamentos-pesquisa/lancamentos-pesquisa.component';
import {NgbButtonsModule, NgbDatepickerModule, NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {LancamentosTabelaDadosComponent} from './components/lancamentos-tabela-dados/lancamentos-tabela-dados.component';

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
    NgbButtonsModule,
    CurrencyMaskModule,
    NgbDatepickerModule,
    NgbPaginationModule,
    RouterModule.forChild(LANCAMENTOS_ROUTES)
  ]
})
export class LancamentosModule { }
