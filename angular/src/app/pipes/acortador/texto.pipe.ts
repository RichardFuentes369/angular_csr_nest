import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nombre'
})
export class TextoPipe implements PipeTransform {

  transform(value: string, truncateLength: number = 5): string {
    if (!value) return '';

    const ellipsis = '...';

    if (value.length <= truncateLength) {
      return value;
    } else {
      return value.substring(0, truncateLength) + ellipsis;
    }
  }

}
