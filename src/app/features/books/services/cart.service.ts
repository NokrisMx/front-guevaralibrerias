import { Injectable, computed, signal } from '@angular/core';
import type { CartItem } from '../interfaces/cart-item-interface';

const STORAGE_KEY = 'guevara_cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _items = signal<CartItem[]>(this.loadCart());

  items = this._items.asReadonly();

  subtotal = computed(() =>
    this._items().reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0),
  );

  shipping = computed(() => (this._items().length > 0 ? 89 : 0));

  total = computed(() => this.subtotal() + this.shipping());

  totalItems = computed(() => this._items().reduce((acc, item) => acc + item.quantity, 0));

  addToCart(item: CartItem) {
    const exists = this._items().find((i) => i.id === item.id);

    if (exists) {
      this._items.update((items) =>
        items.map((i) =>
          i.id === item.id
            ? {
                ...i,
                quantity: Math.min(i.quantity + item.quantity, i.stock),
              }
            : i,
        ),
      );
    } else {
      this._items.update((items) => [...items, item]);
    }

    this.saveCart();
  }

  increment(id: number) {
    this._items.update((items) =>
      items.map((i) =>
        i.id === id && i.quantity < i.stock ? { ...i, quantity: i.quantity + 1 } : i,
      ),
    );

    this.saveCart();
  }

  decrement(id: number) {
    this._items.update((items) =>
      items.map((i) => (i.id === id && i.quantity > 1 ? { ...i, quantity: i.quantity - 1 } : i)),
    );

    this.saveCart();
  }

  remove(id: number) {
    this._items.update((items) => items.filter((i) => i.id !== id));
    this.saveCart();
  }

  clearCart() {
    this._items.set([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  private saveCart() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items()));
  }

  private loadCart(): CartItem[] {
    const cart = localStorage.getItem(STORAGE_KEY);

    if (!cart) return [];

    return JSON.parse(cart);
  }
}
