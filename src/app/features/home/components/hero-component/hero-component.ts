import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { BooksService } from '../../../../core/services/books-service';
import { AuthService } from '../../../auth/services/auth-service';

@Component({
  selector: 'hero-component',
  imports: [RouterLink],
  templateUrl: './hero-component.html',
})
export class HeroComponent {
  authService = inject(AuthService);
  bookService = inject(BooksService);

  bookResource = rxResource({
    params: () => ({ page: 2, pageSize: 4 }),
    stream: ({ params }) => {
      return this.bookService.getBooksPagination(params);
    },
  });
}
