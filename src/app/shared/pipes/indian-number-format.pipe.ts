import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indianNumberFormat'
})
export class IndianNumberFormatPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (value === undefined || value === null) {
      return '';
    }
    return new Intl.NumberFormat('en-IN').format(value);
  }
}
