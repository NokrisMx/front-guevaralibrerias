import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Author } from '../../../../core/interfaces/author-interface';
import { AuthorsService } from '../../../../core/services/authors.service';
import { RecordDates } from '../../components/record-dates-component/record-dates-component';

export type AuthorModalMode = 'create' | 'edit' | 'delete';

@Component({
  selector: 'author-modal',
  imports: [FormsModule, RecordDates],
  templateUrl: './author-modal.html',
})
export class AuthorModal {
  private authorsService = inject(AuthorsService);

  mode = input.required<AuthorModalMode>();
  author = input<Author | null>(null);
  isOpen = input.required<boolean>();

  onClose = output<void>();
  onSuccess = output<void>();

  name = signal('');
  bio = signal('');
  isLoading = signal(false);
  errorMsg = signal('');

  // Cuando cambia el autor o el modo, precarga los campos
  _ = effect(() => {
    const a = this.author();
    if (a && this.mode() === 'edit') {
      this.name.set(a.name);
      this.bio.set(a.bio);
    } else {
      this.name.set('');
      this.bio.set('');
    }
    this.errorMsg.set('');
  });

  get title() {
    return { create: 'Nuevo Autor', edit: 'Editar Autor', delete: 'Eliminar Autor' }[this.mode()];
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
    if (!this.name().trim()) {
      this.errorMsg.set('El nombre es obligatorio.');
      return;
    }

    this.isLoading.set(true);
    this.errorMsg.set('');

    const body = { name: this.name().trim(), bio: this.bio().trim() };

    const request$ =
      this.mode() === 'create'
        ? this.authorsService.createAuthor(body)
        : this.authorsService.updateAuthor(this.author()!.id, body);

    request$.subscribe({
      next: () => {
        this.isLoading.set(false);
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
    this.authorsService.deleteAuthor(this.author()!.id).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.onSuccess.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.error?.message ?? 'No se pudo eliminar el autor.');
      },
    });
  }
}
