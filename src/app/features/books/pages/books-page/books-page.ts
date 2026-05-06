import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'books-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './books-page.html',
})
export class BooksPage {
  search = signal('');
  selectedCategory = signal('Todos');
  selectedAuthor = signal('Todos');
  minPrice = signal(0);
  maxPrice = signal(1000);

  categories = [
    'Todos',
    'Literatura',
    'Historia',
    'Ciencia',
    'Filosofía',
    'Arte',
    'Infantil',
    'Ensayo',
  ];
  authors = ['Todos', 'García Márquez', 'Borges', 'Paz', 'Rulfo', 'Fuentes', 'Castellanos'];

  allBooks = [
    {
      id: 1,
      title: 'Cien Años de Soledad',
      author: 'García Márquez',
      price: 320,
      category: 'Literatura',
      stock: 12,
    },
    {
      id: 2,
      title: 'El Laberinto de la Soledad',
      author: 'Paz',
      price: 280,
      category: 'Ensayo',
      stock: 8,
    },
    {
      id: 3,
      title: 'Pedro Páramo',
      author: 'Rulfo',
      price: 240,
      category: 'Literatura',
      stock: 15,
    },
    { id: 4, title: 'Ficciones', author: 'Borges', price: 300, category: 'Literatura', stock: 6 },
    {
      id: 5,
      title: 'La Región Más Transparente',
      author: 'Fuentes',
      price: 260,
      category: 'Literatura',
      stock: 9,
    },
    {
      id: 6,
      title: 'Balún-Canán',
      author: 'Castellanos',
      price: 220,
      category: 'Literatura',
      stock: 11,
    },
    {
      id: 7,
      title: 'Historia de México',
      author: 'García Márquez',
      price: 450,
      category: 'Historia',
      stock: 4,
    },
    { id: 8, title: 'El Aleph', author: 'Borges', price: 310, category: 'Literatura', stock: 7 },
    {
      id: 9,
      title: 'Libertad bajo palabra',
      author: 'Paz',
      price: 270,
      category: 'Literatura',
      stock: 13,
    },
    {
      id: 10,
      title: 'El Llano en llamas',
      author: 'Rulfo',
      price: 210,
      category: 'Literatura',
      stock: 20,
    },
    { id: 11, title: 'Cosmos', author: 'Fuentes', price: 380, category: 'Ciencia', stock: 5 },
    {
      id: 12,
      title: 'El Espejo Roto',
      author: 'Castellanos',
      price: 190,
      category: 'Arte',
      stock: 8,
    },
  ];

  filteredBooks = computed(() => {
    return this.allBooks.filter((b) => {
      const matchSearch =
        b.title.toLowerCase().includes(this.search().toLowerCase()) ||
        b.author.toLowerCase().includes(this.search().toLowerCase());
      const matchCat =
        this.selectedCategory() === 'Todos' || b.category === this.selectedCategory();
      const matchAuthor = this.selectedAuthor() === 'Todos' || b.author === this.selectedAuthor();
      const matchPrice = b.price >= this.minPrice() && b.price <= this.maxPrice();
      return matchSearch && matchCat && matchAuthor && matchPrice;
    });
  });

  setSearch(val: string) {
    this.search.set(val);
  }
  setCategory(val: string) {
    this.selectedCategory.set(val);
  }
  setAuthor(val: string) {
    this.selectedAuthor.set(val);
  }
  setMaxPrice(val: string) {
    this.maxPrice.set(Number(val));
  }
}
