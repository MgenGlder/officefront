import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'orderNameTransform'
})
export class OrderNameTransformPipe implements PipeTransform {
    transform(value: any): string {
        if (typeof value === 'string' || value instanceof String) {
            const holder: Array<string> = value.split('-');
            const newHolder = holder.map(thing => {
                return thing.charAt(0).toUpperCase() + thing.slice(1);
            });
            const holderTwo: string = newHolder.join(' ');
            return holderTwo;
        } else {
            return value;
        }
    }
}
