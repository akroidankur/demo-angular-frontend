import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'MillisecToTime',
    standalone: true
})
export class MillisecToTimePipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return value
        }

        const dateObject = new Date(parseInt(value)*1000)
        // get local year, date, month and time
        const TIME = dateObject.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit", hour12: true })
        return `${TIME}`
    }
}