import {Injector, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Title} from "@angular/platform-browser";
import {InputValidationDirective} from './diretivas';
import {CabecalhoPaginaComponent} from './components';
import {DialogComponent} from './components/dialog/dialog.component';
import {DataTablePaginationComponent} from "./components/data-table-pagination/data-table-pagination.component";
import {InputValidationMessageComponent} from './components/input-validation-message/input-validation-message.component';

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
    CommonModule,
  ],
  providers: [
    Title
  ]
})
export class SharedModule { }
