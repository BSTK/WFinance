import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatePickerCustomAdapter} from "./utils/date-picker-custom-adapter";
import {InputValidationDirective} from './diretivas/input-validation.directive';
import {NgbDateAdapter, NgbDateParserFormatter} from "@ng-bootstrap/ng-bootstrap";
import {CabecalhoPaginaComponent} from './componentes/cabecalho-pagina/cabecalho-pagina.component';
import {DatePickerCustomDateParserFormatter} from "./utils/date-picker-custom-date-parser-formatter";
import {InputValidationMessageComponent} from './componentes/input-validation-message/input-validation-message.component';

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
  ],
  providers: [
    { provide: NgbDateAdapter, useClass: DatePickerCustomAdapter },
    { provide: NgbDateParserFormatter, useClass: DatePickerCustomDateParserFormatter }
  ]
})
export class SharedModule { }
