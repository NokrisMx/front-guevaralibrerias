export interface Order {
  id: number;
  userId: string;
  username: string;
  createdAt: Date;
  total: number;
  status: string;
  items: Item[];
}

export interface Item {
  bookId: number;
  title: string;
  quantity: number;
  price: number;
  subTotal: number;
}
