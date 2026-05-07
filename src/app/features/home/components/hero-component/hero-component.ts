import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { BooksService } from '../../../../core/services/books-service';

@Component({
  selector: 'hero-component',
  imports: [RouterLink],
  templateUrl: './hero-component.html',
})
export class HeroComponent {
  bookService = inject(BooksService);

  bookResource = rxResource({
    params: () => ({ page: 2, pageSize: 4 }),
    stream: ({ params }) => {
      return this.bookService.getBooksPagination(params);
    },
  });
}
