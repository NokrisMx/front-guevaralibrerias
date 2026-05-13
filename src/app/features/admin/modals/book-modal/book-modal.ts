import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Book } from '../../../../core/interfaces/book-interface';
import { Author } from '../../../../core/interfaces/author-interface';
import { Category } from '../../../../core/interfaces/category-interface';
import { Publisher } from '../../../../core/interfaces/publisher-interface';
import { BooksService } from '../../../../core/services/books.service';
import { AuthorsService } from '../../../../core/services/authors.service';
import { CategoriesService } from '../../../../core/services/categories.service';
import { PublishersService } from '../../../../core/services/publishers.service';
import { RecordDates } from '../../components/record-dates-component/record-dates-component';

export type BookModalMode = 'create' | 'edit' | 'delete';

@Component({
  selector: 'book-modal',
  imports: [FormsModule, RecordDates],
  templateUrl: './book-modal.html',
})
export class BookModal {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;
  private booksService = inject(BooksService);
  private authorsService = inject(AuthorsService);
  private categoriesService = inject(CategoriesService);
  private publishersService = inject(PublishersService);

  mode = input.required<BookModalMode>();
  book = input<Book | null>(null);
  isOpen = input.required<boolean>();

  onClose = output<void>();
  onSuccess = output<void>();

  // Form fields
  title = signal('');
  description = signal('');
  price = signal<number | null>(null);
  pages = signal<number | null>(null);
  isbn = signal('');
  stock = signal<number | null>(null);
  yearPublished = signal('');
  categoryIdModel: number | null = null;
  authorIdModel: number | null = null;
  publisherIdModel: number | null = null;
  imageFile = signal<File | null>(null);
  imagePreview = signal<string | null>(null);

  // Selects
  authors = signal<Author[]>([]);
  categories = signal<Category[]>([]);
  publishers = signal<Publisher[]>([]);

  isLoading = signal(false);
  isLoadingData = signal(false);
  errorMsg = signal('');

  _ = effect(() => {
    if (!this.isOpen()) return;

    this.isLoadingData.set(true);
    this.errorMsg.set('');

    const b = this.book();
    const isEdit = b !== null && this.mode() === 'edit';

    // Campos que no dependen de los selects los asignas ya
    if (isEdit) {
      this.title.set(b!.title);
      this.description.set(b!.description);
      this.price.set(b!.price);
      this.pages.set(b!.pages);
      this.isbn.set(b!.isbn);
      this.stock.set(b!.stock);
      this.yearPublished.set(new Date(b!.yearPublished).toISOString().split('T')[0]);
      this.imagePreview.set(b!.imgUrl);
    } else {
      this.resetForm();
    }

    forkJoin({
      authors: this.authorsService.getAuthors(),
      categories: this.categoriesService.getCategories(),
      publishers: this.publishersService.getPublishers(),
    }).subscribe({
      next: (res) => {
        this.authors.set(res.authors.data);
        this.categories.set(res.categories.data);
        this.publishers.set(res.publishers.data);
        this.isLoadingData.set(false);

        // ← Aquí, cuando las opciones YA están en el DOM
        if (isEdit) {
          this.categoryIdModel = b!.categoryId;
          this.authorIdModel = b!.authorId;
          this.publisherIdModel = b!.publisherId;
        }
      },
      error: () => this.isLoadingData.set(false),
    });
  });

  resetForm() {
    this.title.set('');
    this.description.set('');
    this.price.set(null);
    this.pages.set(null);
    this.isbn.set('');
    this.stock.set(null);
    this.yearPublished.set('');
    this.imageFile.set(null);
    this.imagePreview.set(null);
    this.categoryIdModel = null;
    this.authorIdModel = null;
    this.publisherIdModel = null;

    if (this.fileInput?.nativeElement) {
      this.fileInput.nativeElement.value = '';
    }
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (!file) return;
    this.imageFile.set(file);
    const reader = new FileReader();
    reader.onload = (e) => this.imagePreview.set(e.target?.result as string);
    reader.readAsDataURL(file);
  }

  buildFormData(): FormData {
    const fd = new FormData();
    fd.append('title', this.title());
    fd.append('description', this.description());
    fd.append('price', String(this.price()));
    fd.append('pages', String(this.pages()));
    fd.append('isbn', this.isbn());
    fd.append('stock', String(this.stock()));
    fd.append('yearPublished', this.yearPublished());
    fd.append('categoryId', String(this.categoryIdModel));
    fd.append('authorId', String(this.authorIdModel));
    fd.append('publisherId', String(this.publisherIdModel));
    if (this.imageFile()) fd.append('image', this.imageFile()!);
    return fd;
  }

  get modalTitle() {
    return { create: 'Nuevo Libro', edit: 'Editar Libro', delete: 'Eliminar Libro' }[this.mode()];
  }

  close() {
    if (this.isLoading()) return;
    this.onClose.emit();
  }

  submit() {
    if (this.mode() === 'delete') {
      this.delete();
      return;
    }

    if (!this.title().trim()) {
      this.errorMsg.set('El título es obligatorio.');
      return;
    }
    if (!this.isbn().trim()) {
      this.errorMsg.set('El ISBN es obligatorio.');
      return;
    }
    if (!this.price()) {
      this.errorMsg.set('El precio es obligatorio.');
      return;
    }
    if (!this.categoryIdModel) {
      this.errorMsg.set('Selecciona una categoría.');
      return;
    }
    if (!this.authorIdModel) {
      this.errorMsg.set('Selecciona un autor.');
      return;
    }
    if (!this.publisherIdModel) {
      this.errorMsg.set('Selecciona una editorial.');
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set('');

    const fd = this.buildFormData();

    const request$ =
      this.mode() === 'create'
        ? this.booksService.createBook(fd)
        : this.booksService.updateBook(this.book()!.id, fd);

    request$.subscribe({
      next: () => {
        this.isLoading.set(false);
        this.resetForm();
        this.onSuccess.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.error?.message ?? 'Ocurrió un error, intenta de nuevo.');
      },
    });
  }

  delete() {
    this.isLoading.set(true);
    this.booksService.deleteBook(this.book()!.id).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.onSuccess.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.error?.message ?? 'No se pudo eliminar el libro.');
      },
    });
  }
}
