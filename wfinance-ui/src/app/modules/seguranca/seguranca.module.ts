import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from '@angular/common';
import {SharedModule} from "../../shared/shared.module";
import {SEGUANCA_ROUTES} from "./seguranca.module.routes";
import {LoginComponent} from './pages/login/login.component';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    RouterModule.forChild(SEGUANCA_ROUTES)
  ]
})
export class SegurancaModule { }
