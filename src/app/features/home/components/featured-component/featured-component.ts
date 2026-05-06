import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BooksService } from '../../../../core/services/books-service';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'featured-component',
  imports: [RouterLink],
  templateUrl: './featured-component.html',
})
export class FeaturedComponent {
  bookService = inject(BooksService);

  productResource = rxResource({
    stream: () => {
      return this.bookService.getBooks();
    },
  });
}
