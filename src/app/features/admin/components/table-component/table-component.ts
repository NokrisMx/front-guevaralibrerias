import { CurrencyPipe, DatePipe } from '@angular/common';
import { Component, computed, input, output, signal } from '@angular/core';
import { OrderStatusPipe } from '../../../auth/pipes/order-status-pipe';
import { OrderStatusColorPipe } from '../../../auth/pipes/order-status-color-pipe';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'badge' | 'currency' | 'date' | 'image' | 'status-order';
  badgeClass?: (value: any) => string;
  sortable?: boolean;
  filterable?: boolean;
}

type SortDirection = 'asc' | 'desc' | null;

@Component({
  selector: 'table-component',
  imports: [DatePipe, CurrencyPipe, OrderStatusPipe, OrderStatusColorPipe, FormsModule],
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
  showNew = input(false);

  onView = output<any>();
  onEdit = output<any>();
  onDelete = output<any>();
  onNew = output<void>();

  sortKey = signal<string | null>(null);
  sortDirection = signal<SortDirection>(null);

  columnFilters = signal<Record<string, string>>({});

  pageSize = signal(10);
  currentPage = signal(1);
  pageSizes = [10, 25, 50];

  // Pipeline: filter → sort → paginate
  filteredData = computed(() => {
    let result = [...this.data()];
    const filters = this.columnFilters();

    // Filtrar
    Object.entries(filters).forEach(([key, value]) => {
      if (!value.trim()) return;
      result = result.filter((row) => {
        const val = this.getValue(row, key);
        return String(val ?? '')
          .toLowerCase()
          .includes(value.toLowerCase());
      });
    });

    // Ordenar
    const key = this.sortKey();
    const dir = this.sortDirection();
    if (key && dir) {
      result.sort((a, b) => {
        const aVal = this.getValue(a, key);
        const bVal = this.getValue(b, key);

        if (aVal == null) return 1;
        if (bVal == null) return -1;

        // Fecha
        if (!isNaN(Date.parse(aVal)) && !isNaN(Date.parse(bVal))) {
          return dir === 'asc'
            ? new Date(aVal).getTime() - new Date(bVal).getTime()
            : new Date(bVal).getTime() - new Date(aVal).getTime();
        }

        // Número
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return dir === 'asc' ? aVal - bVal : bVal - aVal;
        }

        // Texto
        return dir === 'asc'
          ? String(aVal).localeCompare(String(bVal))
          : String(bVal).localeCompare(String(aVal));
      });
    }

    return result;
  });

  totalPages = computed(() => Math.ceil(this.filteredData().length / this.pageSize()));

  paginatedData = computed(() => {
    const start = (this.currentPage() - 1) * this.pageSize();
    return this.filteredData().slice(start, start + this.pageSize());
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

  toggleSort(col: TableColumn) {
    if (!col.sortable) return;
    if (this.sortKey() !== col.key) {
      this.sortKey.set(col.key);
      this.sortDirection.set('asc');
    } else if (this.sortDirection() === 'asc') {
      this.sortDirection.set('desc');
    } else {
      this.sortKey.set(null);
      this.sortDirection.set(null);
    }
    this.currentPage.set(1);
  }

  setFilter(key: string, value: string) {
    this.columnFilters.update((f) => ({ ...f, [key]: value }));
    this.currentPage.set(1);
  }

  getFilter(key: string): string {
    return this.columnFilters()[key] ?? '';
  }

  sortIconClass(col: TableColumn): string {
    if (!col.sortable) return '';
    if (this.sortKey() !== col.key) return 'pi pi-sort text-neutral-300';
    return this.sortDirection() === 'asc'
      ? 'pi pi-sort-up-fill text-primary'
      : 'pi pi-sort-down-fill text-primary';
  }

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
    return Math.min(this.currentPage() * this.pageSize(), this.filteredData().length);
  }
}
