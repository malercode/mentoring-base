import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeDashes',
  standalone: true
})
export class RemoveDashesPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return value; 
    return value.replace(/-/g, '');
  }
}