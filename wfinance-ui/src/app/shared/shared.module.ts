import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputValidationDirective} from './diretivas/input-validation.directive';
import {CabecalhoPaginaComponent} from './components/cabecalho-pagina/cabecalho-pagina.component';
import {InputValidationMessageComponent} from './components/input-validation-message/input-validation-message.component';
import { DialogComponent } from './components/dialog/dialog.component';

@NgModule({
  declarations: [
    CabecalhoPaginaComponent,
    InputValidationDirective,
    InputValidationMessageComponent,
    DialogComponent
  ],
  exports: [
    CabecalhoPaginaComponent,
    InputValidationDirective,
    InputValidationMessageComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
