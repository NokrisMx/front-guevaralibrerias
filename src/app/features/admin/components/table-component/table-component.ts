import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { OrderStatusColorPipe } from '../../../auth/pipes/order-status-color-pipe';
import { OrderStatusPipe } from '../../../auth/pipes/order-status-pipe';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'currency' | 'date' | 'image' | 'status-order';
  badgeClass?: (value: any) => string;
}

@Component({
  selector: 'table-component',
  imports: [DatePipe, DecimalPipe, CurrencyPipe, OrderStatusColorPipe, OrderStatusPipe],
  templateUrl: './table-component.html',
})
export class TableComponent {
  columns = input.required<TableColumn[]>();
  data = input.required<any[]>();
  isLoading = input(false);
  title = input('');
  subtitle = input('');

  onEdit = output<any>();
  onDelete = output<any>();
  onNew = output<void>();

  getValue(row: any, key: string): any {
    return key.split('.').reduce((obj, k) => obj?.[k], row);
  }
}
