import { Component, input, output, signal } from '@angular/core';
import type { Order } from '../../../../core/interfaces/order-interface';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { OrderStatusPipe } from '../../../auth/pipes/order-status-pipe';
import { OrderStatusColorPipe } from '../../../auth/pipes/order-status-color-pipe';

@Component({
  selector: 'order-modal',
  imports: [CurrencyPipe, OrderStatusPipe, DatePipe, OrderStatusColorPipe],
  templateUrl: './order-modal.html',
})
export class OrderModal {
  order = input<Order | null>(null);
  isOpen = input.required<boolean>();
  onClose = output<void>();
}
