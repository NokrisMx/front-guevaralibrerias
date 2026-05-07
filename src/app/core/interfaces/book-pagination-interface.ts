import { Book } from './book-interface';

export interface BookPagination {
  page: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  data: Book[];
}
