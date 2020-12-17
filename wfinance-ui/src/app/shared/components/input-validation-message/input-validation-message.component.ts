import {Component, Input, OnInit} from '@angular/core';
import {NgModel} from "@angular/forms";

@Component({
  selector: 'wf-input-validation-message',
  template: `
      <span class="invalid-feedback" *ngIf="this.campo.dirty && this.campo.invalid">• {{ mensagem }}</span>
  `
})
export class InputValidationMessageComponent implements OnInit {

  @Input() readonly erro: string;
  @Input() readonly campo: NgModel;
  @Input() readonly mensagem: string;

  constructor() { }

  ngOnInit(): void { }

}
