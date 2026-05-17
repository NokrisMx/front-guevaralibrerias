import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../../../shared/services/order.service';
import { CurrencyPipe } from '@angular/common';
import { BookImgPipe } from '../../../../shared/pipes/book-img-pipe';

@Component({
  selector: 'cart-page',
  imports: [RouterLink, CurrencyPipe, BookImgPipe],
  templateUrl: './cart-page.html',
})
export class CartPage {
  private cartService = inject(CartService);
  private orderService = inject(OrderService);

  items = this.cartService.items;

  subtotal = this.cartService.subtotal;

  shipping = this.cartService.shipping;

  total = this.cartService.total;

  inc(id: number) {
    this.cartService.increment(id);
  }

  dec(id: number) {
    this.cartService.decrement(id);
  }

  remove(id: number) {
    this.cartService.remove(id);
  }
  checkout() {
    this.orderService.buyCart(this.items()).subscribe({
      next: () => {
        this.cartService.clearCart();
      },
    });
  }
}
