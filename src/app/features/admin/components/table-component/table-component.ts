import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { OrderStatusPipe } from '../../../auth/pipes/order-status-pipe';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'currency' | 'date' | 'image' | 'status-order';
  badgeClass?: (value: any) => string;
}

@Component({
  selector: 'table-component',
  imports: [DatePipe, CurrencyPipe, OrderStatusPipe],
  templateUrl: './table-component.html',
})
export class TableComponent {
  columns = input.required<TableColumn[]>();
  data = input.required<any[]>();
  isLoading = input(false);
  title = input('');
  subtitle = input('');
  showView = input(false);
  showEdit = input(false);
  showDelete = input(false);

  onView = output<any>();
  onEdit = output<any>();
  onDelete = output<any>();
  onNew = output<void>();

  pageSize = signal(10);
  currentPage = signal(1);
  pageSizes = [10, 25, 50];

  totalPages = computed(() => Math.ceil(this.data().length / this.pageSize()));

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.data().slice(start, start + this.pageSize());
  });

  pages = computed(() => {
    const total = this.totalPages();
    const current = this.currentPage();
    const delta = 2;
    const pages: (number | '...')[] = [];

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= current - delta && i <= current + delta)) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  });

  setPageSize(size: number) {
    this.pageSize.set(size);
    this.currentPage.set(1);
  }

  goToPage(page: number | '...') {
    if (page === '...' || page < 1 || page > this.totalPages()) return;
    this.currentPage.set(page);
  }

  prevPage() {
    if (this.currentPage() > 1) this.currentPage.update((p) => p - 1);
  }

  nextPage() {
    if (this.currentPage() < this.totalPages()) this.currentPage.update((p) => p + 1);
  }

  getValue(row: any, key: string): any {
    return key.split('.').reduce((obj, k) => obj?.[k], row);
  }

  get rangeStart() {
    return (this.currentPage() - 1) * this.pageSize() + 1;
  }
  get rangeEnd() {
    return Math.min(this.currentPage() * this.pageSize(), this.data().length);
  }
}
