import {Injectable} from '@angular/core';
import {NgbDateParserFormatter, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {formataComZero} from './date-picker-utils';

@Injectable()
export class DatePickerCustomDateParserFormatter extends NgbDateParserFormatter {
  
  readonly DELIMITER = '/';
  
  parse(value: string): NgbDateStruct | null {
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
  
  format(date: NgbDateStruct | null): string {
    return date
      ? formataComZero(date.day) + this.DELIMITER + formataComZero(date.month) + this.DELIMITER + date.year
      : '';
  }
  
}
