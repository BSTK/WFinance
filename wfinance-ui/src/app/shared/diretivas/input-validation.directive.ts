import {Directive, HostBinding} from '@angular/core';
import {NgModel} from "@angular/forms";

@Directive({
  selector: '[wfInputValidation]'
})
export class InputValidationDirective {

  constructor(public control: NgModel) {}

  @HostBinding('class.is-valid') get valid() {
    return !this.control.pristine && this.control.valid;
  }

  @HostBinding('class.is-invalid') get invalid() {
    return this.control.dirty && this.control.invalid;
  }

}
