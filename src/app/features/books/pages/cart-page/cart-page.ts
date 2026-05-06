import { Component, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'cart-page',
  imports: [RouterLink],
  templateUrl: './cart-page.html',
})
export class CartPage {
  items = signal([
    { id: 1, title: 'Cien Años de Soledad', author: 'García Márquez', price: 320, qty: 1 },
    { id: 2, title: 'Pedro Páramo', author: 'Juan Rulfo', price: 240, qty: 2 },
    { id: 3, title: 'Ficciones', author: 'Jorge Luis Borges', price: 300, qty: 1 },
  ]);
  subtotal = computed(() => this.items().reduce((s, i) => s + i.price * i.qty, 0));
  shipping = 89;
  total = computed(() => this.subtotal() + this.shipping);
  inc(id: number) {
    this.items.update((items) => items.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));
  }
  dec(id: number) {
    this.items.update((items) =>
      items.map((i) => (i.id === id && i.qty > 1 ? { ...i, qty: i.qty - 1 } : i)),
    );
  }
  remove(id: number) {
    this.items.update((items) => items.filter((i) => i.id !== id));
  }
}
