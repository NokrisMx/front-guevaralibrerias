export interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  imgUrl: string;
  isbn: string;
  stock: number;
  categoryId: number;
  categoryName: string;
  authorId: number;
  authorName: string;
}
