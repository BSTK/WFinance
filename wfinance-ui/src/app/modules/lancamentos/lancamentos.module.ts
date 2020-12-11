import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LancamentosComponent} from './pages/lancamentos/lancamentos.component';
import {RouterModule} from "@angular/router";
import {LANCAMENTOS_ROUTES} from "./lancamentos.module.routes";
import {NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [LancamentosComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(LANCAMENTOS_ROUTES),
    NgbPaginationModule,
    NgbTooltipModule
  ]
})
export class LancamentosModule { }
