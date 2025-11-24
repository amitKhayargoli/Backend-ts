import { Book } from "../types/book.type";

let books: Book[] = [
  { id: "B-1", title: "Harry potter" },
  { id: "B-2", title: "Lord of the rings", date: "29-05-2001" },
];

export interface IBookRepository {
  createBook(book: Book): Book;
  getAllBooks(): Book[];
  findBookById(id: string): Book | undefined;
}

export class BookRepository implements IBookRepository {
  createBook(book: Book): Book {
    books.push(book);
    return book;
  }

  getAllBooks(): Book[] {
    return books;
  }
  findBookById(id: string): Book | undefined {
    return books.find((book) => book.id === id);
  }
}
