// Business Layer -> Connect Controller with Repository
import { CreateBookDTO } from "../dtos/book.dto";
import { Book } from "../types/book.type";
import {
  IBookRepository,
  BookRepository,
} from "../repositories/book.repository";

let bookRepository: IBookRepository = new BookRepository();

export class BookService {
  createBook(book: CreateBookDTO) {
    // business logic
    const existingBook = bookRepository.findBookById(book.id);
    if (existingBook) {
      throw new Error("Book ID already exists");
    }
    const newBook: Book = {
      id: book.id,
      title: book.title,
    };
    let created: Book = bookRepository.createBook(newBook);
    // latter transform/map
    // ...
    return created;
  }

  getBooks(): Book[] {
    // transform data / business logic
    let response: Book[] = bookRepository.getAllBooks().map((book) => {
      return {
        ...book,
        title: book.title.toUpperCase(),
      };
    });
    return response;
  }

  findBookById(id: string): Book | undefined {
    return bookRepository.findBookById(id);
  }
}
