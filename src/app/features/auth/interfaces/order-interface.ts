export interface Order {
  id: number;
  userId: string;
  username: string;
  createdAt: string;
  total: number;
  status: string;
  items: OrderItem[];
}

export interface OrderItem {
  bookId: number;
  title: string;
  quantity: number;
  price: number;
  subTotal: number;
}
