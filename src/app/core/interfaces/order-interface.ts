export interface Order {
  id: number;
  userId: string;
  username: string;
  createdAt: string;
  total: number;
  status: string;
  items: Item[];
}

export interface Item {
  bookId: number;
  imgUrl: string;
  title: string;
  quantity: number;
  price: number;
  subTotal: number;
}
