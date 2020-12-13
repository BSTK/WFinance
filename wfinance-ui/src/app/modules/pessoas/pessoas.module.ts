import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {CommonModule} from '@angular/common';
import {RouterModule} from "@angular/router";
import {PESSOAS_ROUTES} from "./pessoas.module.routes";
import {SharedModule} from "../../shared/shared.module";
import {PessoasComponent} from './pages/pessoas/pessoas.component';
import {NgbPaginationModule, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {PessoasCadastroComponent} from './pages/pessoas-cadastro/pessoas-cadastro.component';
import {PessoasPesquisaComponent} from './componentes/pessoas-pesquisa/pessoas-pesquisa.component';
import {PessoasTabelaDadosComponent} from './componentes/pessoas-tabela-dados/pessoas-tabela-dados.component';

@NgModule({
  declarations: [
    PessoasComponent,
    PessoasPesquisaComponent,
    PessoasCadastroComponent,
    PessoasTabelaDadosComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgbTooltipModule,
    NgbPaginationModule,
    RouterModule.forChild(PESSOAS_ROUTES)
  ]
})
export class PessoasModule { }
