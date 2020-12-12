import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CabecalhoPaginaComponent } from './componentes/cabecalho-pagina/cabecalho-pagina.component';
import { InputValidationMessageComponent } from './componentes/input-validation-message/input-validation-message.component';
import { InputValidationDirective } from './diretivas/input-validation.directive';

@NgModule({
  declarations: [
    CabecalhoPaginaComponent,
    InputValidationMessageComponent,
    InputValidationDirective
  ],
  exports: [
    CabecalhoPaginaComponent,
    InputValidationMessageComponent,
    InputValidationDirective
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
