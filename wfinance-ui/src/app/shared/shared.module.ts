import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogComponent} from './components/dialog/dialog.component';
import {InputValidationDirective} from './diretivas/input-validation.directive';
import {CabecalhoPaginaComponent} from './components/cabecalho-pagina/cabecalho-pagina.component';
import {DataTablePaginationComponent} from "./components/data-table-pagination/data-table-pagination.component";
import {InputValidationMessageComponent} from './components/input-validation-message/input-validation-message.component';
import {Title} from "@angular/platform-browser";

@NgModule({
  declarations: [
    DialogComponent,
    CabecalhoPaginaComponent,
    InputValidationDirective,
    DataTablePaginationComponent,
    InputValidationMessageComponent
  ],
  exports: [
    CabecalhoPaginaComponent,
    InputValidationDirective,
    DataTablePaginationComponent,
    InputValidationMessageComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    Title
  ]
})
export class SharedModule { }
