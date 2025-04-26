import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
    standalone: true
})
export class TruncatePipe implements PipeTransform {
    transform(value: string, maxLength: number): string {
        if (!value) {
            return '';
        }

        if (value.length <= maxLength) {
            return value;
        }

        const truncated = value.slice(0, maxLength);
        const lastSpace = truncated.lastIndexOf(' ');

        return truncated.slice(0, lastSpace > 0 ? lastSpace : maxLength) + '...';
    }
}