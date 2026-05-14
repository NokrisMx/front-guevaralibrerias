import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import type { ApiResponse } from '../interfaces/ApiResponse';
import type { Order } from '../../core/interfaces/order-interface';
import type { CartItem } from '../../features/books/interfaces/cart-item-interface';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private http = inject(HttpClient);

  getOrders(): Observable<ApiResponse<Order[]>> {
    return this.http.get<ApiResponse<Order[]>>(`${baseUrl}/Order`);
  }

  getOrderById(id: number): Observable<ApiResponse<Order>> {
    return this.http.get<ApiResponse<Order>>(`${baseUrl}/Order/${id}`);
  }

  buyCart(items: CartItem[]) {
    return this.http.post(`${baseUrl}/Order/buy`, {
      items: items.map((i) => ({
        bookId: i.id,
        quantity: i.quantity,
      })),
    });
  }
}
