export interface Book {
  id: number;
  title: string;
  description: string;
  price: number;
  pages: number;
  imgUrl: string;
  isbn: string;
  stock: number;
  yearPublished: Date;
  categoryId: number;
  categoryName: string;
  authorId: number;
  authorName: string;
  publisherId: number;
  publisherName: string;
  createdAt: string;
  updatedAt: string | null;
}
