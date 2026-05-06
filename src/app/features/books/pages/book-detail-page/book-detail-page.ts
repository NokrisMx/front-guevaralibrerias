import { Component, signal } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'book-detail-page',
  imports: [RouterLink],
  templateUrl: './book-detail-page.html',
})
export class BookDetailPage {
  qty = signal(1);
  added = signal(false);
  book = {
    id: 1,
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    category: 'Literatura Latinoamericana',
    price: 320,
    stock: 12,
    description:
      'Una de las obras más importantes de la literatura en lengua española y de la literatura universal. La novela narra la historia de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.',
    pages: 471,
    year: 1967,
    isbn: '978-0-06-088328-7',
    publisher: 'Editorial Sudamericana',
  };

  increment() {
    if (this.qty() < this.book.stock) this.qty.update((v) => v + 1);
  }
  decrement() {
    if (this.qty() > 1) this.qty.update((v) => v - 1);
  }
  addToCart() {
    this.added.set(true);
    setTimeout(() => this.added.set(false), 2000);
  }
}
