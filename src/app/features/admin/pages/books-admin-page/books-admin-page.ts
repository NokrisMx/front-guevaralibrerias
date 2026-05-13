import { Component, inject, signal } from '@angular/core';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { BooksService } from '../../../../core/services/books.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { BookModal, BookModalMode } from '../../modals/book-modal/book-modal';
import { Book } from '../../../../core/interfaces/book-interface';

@Component({
  selector: 'books-admin-page',
  imports: [TableComponent, BookModal],
  templateUrl: './books-admin-page.html',
})
export class BooksAdminPage {
  private booksService = inject(BooksService);

  booksResource = rxResource({
    stream: () => this.booksService.getBooks(),
  });

  modalOpen = signal(false);
  modalMode = signal<BookModalMode>('create');
  selectedBook = signal<Book | null>(null);

  columns: TableColumn[] = [
    { key: 'title', label: 'Título' },
    { key: 'authorName', label: 'Autor' },
    { key: 'categoryName', label: 'Categoría' },
    { key: 'publisherName', label: 'Editorial' },
    { key: 'price', label: 'Precio', type: 'currency' },
    { key: 'stock', label: 'Stock' },
    { key: 'createdAt', label: 'Creado', type: 'date' },
  ];

  onNew() {
    this.selectedBook.set(null);
    this.modalMode.set('create');
    this.modalOpen.set(true);
  }

  onEdit(book: Book) {
    this.selectedBook.set(book);
    this.modalMode.set('edit');
    this.modalOpen.set(true);
  }

  onDelete(book: Book) {
    this.selectedBook.set(book);
    this.modalMode.set('delete');
    this.modalOpen.set(true);
  }

  onModalClose() {
    this.modalOpen.set(false);
    this.selectedBook.set(null);
  }

  onModalSuccess() {
    this.modalOpen.set(false);
    this.selectedBook.set(null);
    this.booksResource.reload();
  }
}
