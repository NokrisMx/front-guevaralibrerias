import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoryModal, CategoryModalMode } from '../../modals/category-modal/category-modal';
import { Category } from '../../../../core/interfaces/category-interface';

@Component({
  selector: 'categories-admin-page',
  imports: [TableComponent, CategoryModal],
  templateUrl: './categories-admin-page.html',
})
export class CategoriesAdminPage {
  private categoriesService = inject(CategoriesService);

  categoriesResource = rxResource({
    stream: () => this.categoriesService.getCategories(),
  });

  modalOpen = signal<boolean>(false);
  modalMode = signal<CategoryModalMode>('create');
  selectedCategory = signal<Category | null>(null);

  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'createdAt', label: 'Creado', type: 'date' },
    { key: 'updatedAt', label: 'Editado', type: 'date' },
  ];

  onNew() {
    this.selectedCategory.set(null);
    this.modalMode.set('create');
    this.modalOpen.set(true);
  }

  onEdit(category: Category) {
    this.selectedCategory.set(category);
    this.modalMode.set('edit');
    this.modalOpen.set(true);
  }

  onDelete(category: Category) {
    this.selectedCategory.set(category);
    this.modalMode.set('delete');
    this.modalOpen.set(true);
  }

  onModalClose() {
    this.modalOpen.set(false);
    this.selectedCategory.set(null);
  }

  onModalSuccess() {
    this.modalOpen.set(false);
    this.selectedCategory.set(null);
    this.categoriesResource.reload();
  }
}
