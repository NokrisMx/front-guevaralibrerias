import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus',
})
export class OrderStatusPipe implements PipeTransform {
  transform(status: string): string {
    switch (status) {
      case 'Pending':
        return 'Pendiente';

      case 'Paid':
        return 'Pagado';

      case 'Cancelled':
        return 'Cancelado';

      default:
        return status;
    }
  }
}
