import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../../../core/services/books.service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'featured-component',
  imports: [RouterLink],
  templateUrl: './featured-component.html',
})
export class FeaturedComponent {
  bookService = inject(BooksService);
  booksFeatured = computed(() => this.bookResource.value()?.data.data ?? []);

  bookResource = rxResource({
    params: () => ({ page: 1, pageSize: 4 }),
    stream: ({ params }) => {
      return this.bookService.getBooksPagination(params);
    },
  });
}
