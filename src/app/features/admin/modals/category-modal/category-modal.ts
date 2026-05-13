import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from '../../../../core/interfaces/category-interface';
import { RecordDates } from '../../components/record-dates-component/record-dates-component';

export type CategoryModalMode = 'create' | 'edit' | 'delete';

@Component({
  selector: 'category-modal',
  imports: [FormsModule, RecordDates],
  templateUrl: './category-modal.html',
})
export class CategoryModal {
  private categoriesService = inject(CategoriesService);

  mode = input.required<CategoryModalMode>();
  category = input<Category | null>(null);
  isOpen = input.required<boolean>();

  onClose = output<void>();
  onSuccess = output<void>();

  name = signal('');
  isLoading = signal(false);
  errorMsg = signal('');

  // Cuando cambia la categoria o el modo, precarga los campos
  _ = effect(() => {
    const c = this.category();
    if (c && this.mode() === 'edit') {
      this.name.set(c.name);
    } else {
      this.name.set('');
    }
    this.errorMsg.set('');
  });

  get title() {
    return { create: 'Nueva Categoría', edit: 'Editar Categoría', delete: 'Eliminar Categoría' }[
      this.mode()
    ];
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

    const body = { name: this.name().trim() };

    const request$ =
      this.mode() === 'create'
        ? this.categoriesService.createCategory(body)
        : this.categoriesService.updateCategory(this.category()!.id, body);

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
    this.categoriesService.deleteCategory(this.category()!.id).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.onSuccess.emit();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMsg.set(err.error?.message ?? 'No se pudo eliminar la categoría.');
      },
    });
  }
}
