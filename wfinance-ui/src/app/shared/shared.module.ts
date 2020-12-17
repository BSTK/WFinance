import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {InputValidationDirective} from './diretivas/input-validation.directive';
import {CabecalhoPaginaComponent} from './components/cabecalho-pagina/cabecalho-pagina.component';
import {InputValidationMessageComponent} from './components/input-validation-message/input-validation-message.component';

@NgModule({
  declarations: [
    CabecalhoPaginaComponent,
    InputValidationDirective,
    InputValidationMessageComponent
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
