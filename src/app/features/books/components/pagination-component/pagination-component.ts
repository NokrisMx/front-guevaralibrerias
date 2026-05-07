import { Component, computed, input, linkedSignal, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'pagination-component',
  imports: [RouterLink],
  templateUrl: './pagination-component.html',
})
export class PaginationComponent {
  pages = input<number>(0);
  currentPage = input<number>(1);
  activePage = linkedSignal(this.currentPage);
  pageChange = output<number>();

  getPagesList = computed(() => {
    return Array.from({ length: this.pages() }, (_, i) => i + 1);
  });

  changePage(page: number) {
    this.activePage.set(page);

    this.pageChange.emit(page);
  }
}
