import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'orders-page',
  imports: [RouterLink],
  templateUrl: './orders-page.html',
})
export class OrdersPage {
  selectedOrder = signal<number | null>(null);
  orders = [
    {
      id: 'GUE-2024-001',
      date: '28 Abr 2025',
      status: 'Entregado',
      total: 860,
      items: [
        { title: 'Cien Años de Soledad', qty: 1, price: 320 },
        { title: 'Pedro Páramo', qty: 2, price: 240 },
        { title: 'Ficciones', qty: 1, price: 300 },
      ],
    },
    {
      id: 'GUE-2024-002',
      date: '15 Abr 2025',
      status: 'En tránsito',
      total: 580,
      items: [
        { title: 'El Laberinto de la Soledad', qty: 1, price: 280 },
        { title: 'El Aleph', qty: 1, price: 310 },
      ],
    },
    {
      id: 'GUE-2024-003',
      date: '2 Mar 2025',
      status: 'Entregado',
      total: 480,
      items: [
        { title: 'Pedro Páramo', qty: 1, price: 240 },
        { title: 'Libertad bajo palabra', qty: 1, price: 270 },
      ],
    },
  ];
  statusColor(s: string) {
    return s === 'Entregado'
      ? 'bg-green-50 text-green-700'
      : s === 'En tránsito'
        ? 'bg-amber-50 text-amber-700'
        : 'bg-blue-50 text-blue-700';
  }
  toggle(id: number) {
    this.selectedOrder.update((v) => (v === id ? null : id));
  }
}
