import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatusColor',
})
export class OrderStatusColorPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'Paid':
        return 'bg-green-50 text-green-700';

      case 'Pending':
        return 'bg-amber-50 text-amber-700';

      case 'Cancelled':
        return 'bg-red-50 text-red-700';

      default:
        return 'bg-neutral-50 text-neutral-700';
    }
  }
}
