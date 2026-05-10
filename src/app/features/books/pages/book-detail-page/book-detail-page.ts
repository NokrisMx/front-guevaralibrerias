import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { BooksService } from '../../../../core/services/books-service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'book-detail-page',
  imports: [RouterLink, DatePipe],
  templateUrl: './book-detail-page.html',
})
export class BookDetailPage {
  private route = inject(ActivatedRoute);
  private bookService = inject(BooksService);

  qty = signal(1);
  added = signal(false);
  bookId = computed(() => {
    return Number(this.route.snapshot.paramMap.get('id'));
  });
  book = computed(() => this.bookResource.value()?.data);

  bookResource = rxResource({
    params: () => ({
      id: this.bookId(),
    }),

    stream: ({ params }) => {
      return this.bookService.getBookById(params.id);
    },
  });

  increment() {
    if (this.qty() < this.book()!.stock) this.qty.update((v) => v + 1);
  }
  decrement() {
    if (this.qty() > 1) this.qty.update((v) => v - 1);
  }
  addToCart() {
    this.added.set(true);
    setTimeout(() => this.added.set(false), 2000);
  }
}
