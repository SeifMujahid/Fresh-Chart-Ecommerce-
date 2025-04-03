import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cuttext',
  standalone: true,
})
export class CuttextPipe implements PipeTransform {
  transform(text: string, end: number): string {
    return text.split(' ').slice(0, end).join(' ');
  }
}
