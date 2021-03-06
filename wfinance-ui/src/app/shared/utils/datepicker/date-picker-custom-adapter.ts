import {Injectable} from '@angular/core';
import {formataComZero} from './date-picker-utils';
import {NgbDateAdapter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class DatePickerCustomAdapter extends NgbDateAdapter<string> {
  
  readonly DELIMITER = '-';
  
  fromModel(value: string | null): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10)
      };
    }
    
    return null;
  }
  
  toModel(date: NgbDateStruct | null): string | null {
    return date
      ? formataComZero(date.day) + this.DELIMITER + formataComZero(date.month) + this.DELIMITER + date.year
      : '';
  }
  
}
