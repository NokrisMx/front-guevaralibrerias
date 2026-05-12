import { Component, inject, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories.service';
import { TableColumn, TableComponent } from '../../components/table-component/table-component';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'categories-admin-page',
  imports: [TableComponent],
  templateUrl: './categories-admin-page.html',
})
export class CategoriesAdminPage {
  private categoriesService = inject(CategoriesService);

  categoriesResource = rxResource({
    stream: () => this.categoriesService.getCategories(),
  });

  columns: TableColumn[] = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Nombre' },
    { key: 'createdAt', label: 'Creado', type: 'date' },
    { key: 'updatedAt', label: 'Editado', type: 'date' },
  ];

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
