import { Component, effect, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PublishersService } from '../../../../core/services/publishers.service';
import type { Publisher } from '../../../../core/interfaces/publisher-interface';
import { RecordDates } from '../../components/record-dates-component/record-dates-component';
import { AlertService } from '../../../../shared/services/alert.service';

export type PublisherModalMode = 'create' | 'edit' | 'delete';

@Component({
  selector: 'publisher-modal',
  imports: [FormsModule, RecordDates],
  templateUrl: './publisher-modal.html',
})
export class PublisherModal {
  private publishersService = inject(PublishersService);
  private alertService = inject(AlertService);

  mode = input.required<PublisherModalMode>();
  publisher = input<Publisher | null>(null);
  isOpen = input.required<boolean>();

  onClose = output<void>();
  onSuccess = output<void>();

  name = signal('');
  isLoading = signal(false);
  errorMsg = signal('');

  // Cuando cambia la editorial o el modo, precarga los campos
  _ = effect(() => {
    const a = this.publisher();
    if (a && this.mode() === 'edit') {
      this.name.set(a.name);
    } else {
      this.name.set('');
    }
    this.errorMsg.set('');
  });

  resetForm() {
    this.name.set('');
    this.errorMsg.set('');
  }

  get title() {
    return { create: 'Nuevo Editorial', edit: 'Editar Editorial', delete: 'Eliminar Editorial' }[
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
        ? this.publishersService.createPublisher(body)
        : this.publishersService.updatePublisher(this.publisher()!.id, body);

    request$.subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.alertService.success(res.message);
        this.onSuccess.emit();
        this.close();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.alertService.error(err.error?.message ?? 'Ocurrió un error, intenta de nuevo.');
        this.close();
      },
    });
  }

  delete() {
    this.isLoading.set(true);
    this.publishersService.deletePublisher(this.publisher()!.id).subscribe({
      next: (res) => {
        this.isLoading.set(false);
        this.alertService.success(res.message);
        this.onSuccess.emit();
        this.close();
      },
      error: (err) => {
        this.isLoading.set(false);
        this.alertService.error(err.error?.message ?? 'No se pudo eliminar la editorial.');
        this.close();
      },
    });
  }
}
