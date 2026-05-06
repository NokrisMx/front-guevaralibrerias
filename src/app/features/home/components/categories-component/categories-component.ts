import { Component, inject } from '@angular/core';
import { CategoriesService } from '../../../../core/services/categories-service';
import { rxResource } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'categories-component',
  imports: [RouterLink],
  templateUrl: './categories-component.html',
})
export class CategoriesComponent {
  categoryService = inject(CategoriesService);

  productResource = rxResource({
    stream: () => {
      return this.categoryService.getCategories();
    },
  });
}
