import { Component, inject, OnInit, signal } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { Category } from '../../../../core/interfaces/category-interface';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';

@Component({
  selector: 'categories-admin-page',
  imports: [TableComponent],
  templateUrl: './categories-admin-page.html',
})
export class CategoriesAdminPage implements OnInit {
  private categoriesService = inject(CategoriesService);

  isLoading = signal(true);
  categories = signal<Category[]>([]);

  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'createdAt', label: 'Creado', type: 'date' },
    { key: 'updatedAt', label: 'Editado', type: 'date' },
  ];

  ngOnInit() {
    this.categoriesService.getCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  onNew() {
    /* abrir modal */
  }
  onEdit(item: any) {
    /* abrir modal editar */
  }
  onDelete(item: any) {
    /* abrir modal confirmar */
  }
}
