import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'IsoDateToDatetime',
    standalone: true
})
export class IsoDateToDatetimePipe implements PipeTransform {
    transform(value: string): string {
        if (!value) {
            return value
        }

        const dateObject = new Date(value)
        // get local year, date, month and time
        const YEAR = dateObject.getFullYear() 
        const DATE = dateObject.getDate()
        const MONTH = dateObject.toLocaleDateString('en-us', { month: "short"})
        const TIME = dateObject.toLocaleTimeString('en-US', { hour: "2-digit", minute: "2-digit", hour12: true }) 
        return `${DATE} ${MONTH} ${YEAR} ${TIME}`
    }
}