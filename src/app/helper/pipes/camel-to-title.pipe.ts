import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'camelToTitle',
  standalone: true
})
export class CamelToTitlePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return value;
    }

    // Add space between camel case
    const spacedString = value.replace(/([a-z])([A-Z])/g, '$1 $2');

    // Capitalize the first letter of each word
    return spacedString.replace(/\b\w/g, match => match.toUpperCase());
  }
}
