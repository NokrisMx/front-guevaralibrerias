import { Component, signal, computed, inject, effect } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { CategoriesService } from '../../../../core/services/categories.service';
import { BooksService } from '../../../../core/services/books.service';
import { AuthorsService } from '../../../../core/services/authors.service';
import { PublishersService } from '../../../../core/services/publishers.service';
import { CardBookComponent } from '../../components/card-book-component/card-book-component';
import { PaginationComponent } from '../../components/pagination-component/pagination-component';

@Component({
  selector: 'books-page',
  imports: [FormsModule, CardBookComponent, PaginationComponent],
  templateUrl: './books-page.html',
})
export class BooksPage {
  categoryService = inject(CategoriesService);
  bookService = inject(BooksService);
  authorService = inject(AuthorsService);
  publisherService = inject(PublishersService);

  private route = inject(ActivatedRoute);

  search = signal<string>('');
  debouncedSearch = signal<string>('');
  currentPage = signal<number>(1);
  selectedCategory = signal<number>(0);
  selectedAuthor = signal<number>(0);
  selectedPublisher = signal<number>(0);
  minPrice = signal<number>(0);
  maxPrice = signal<number>(1000);
  sliderPrice = signal<number>(1000);
  books = computed(() => this.bookResource.value()?.data?.data ?? []);
  pagination = computed(() => this.bookResource.value()?.data);

  constructor() {
    this.route.queryParams.subscribe((params) => {
      const categoryId = Number(params['categoryId']) || 0;

      this.selectedCategory.set(categoryId);
    });

    effect((onCleanup) => {
      const value = this.search();

      const timeout = setTimeout(() => {
        this.debouncedSearch.set(value);
      }, 800);

      onCleanup(() => clearTimeout(timeout));
    });
  }

  bookResource = rxResource({
    params: () => ({
      page: this.currentPage(),
      pageSize: 12,
      query: this.debouncedSearch(),
      categoryId: this.selectedCategory(),
      authorId: this.selectedAuthor(),
      publisherId: this.selectedPublisher(),
      minPrice: this.minPrice(),
      maxPrice: this.maxPrice(),
    }),

    stream: ({ params }) => {
      return this.bookService.getBooksPagination(params);
    },
  });

  categoryResource = rxResource({
    stream: () => {
      return this.categoryService.getCategories();
    },
  });

  authorsResource = rxResource({
    stream: () => {
      return this.authorService.getAuthors();
    },
  });

  publisherResource = rxResource({
    stream: () => {
      return this.publisherService.getPublishers();
    },
  });

  setSearch(val: string) {
    this.search.set(val);
    this.currentPage.set(1);
  }
  setCategory(id: number) {
    this.selectedCategory.set(id);
    this.currentPage.set(1);
  }
  setAuthor(id: number) {
    this.selectedAuthor.set(id);
    this.currentPage.set(1);
  }
  setPublisher(id: number) {
    this.selectedPublisher.set(id);
    this.currentPage.set(1);
  }
  setMaxPrice(val: string) {
    this.maxPrice.set(Number(val));
    this.currentPage.set(1);
  }
}
