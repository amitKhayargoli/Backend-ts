import { Request, Response } from "express";
import { z } from "zod";
import { CreateBookDTO } from "../dtos/book.dto";
import { Book } from "../types/book.type";
import { BookService } from "../services/book.service";

let bookService = new BookService();

export class BookController {
  createBook(req: Request, res: Response) {
    try {
      const parsedBook = CreateBookDTO.safeParse(req.body);
      // auto validation
      if (!parsedBook.success) {
        return res.status(400).json({ errors: parsedBook.error });
      }
      const { id, title } = parsedBook.data;
      const newBook: Book = bookService.createBook({ id, title });
      return res.status(201).json(newBook);
    } catch (error: Error | any) {
      return res.status(500).send(error.message ?? "Internal Server Error");
    }
  }

  getAllBooks(req: Request, res: Response) {
    const requestedBook: Book[] = bookService.getBooks();
    return res.status(200).json(requestedBook);
  }

  getBookById(req: Request, res: Response) {
    const bookId: string = req.params.bookid;
    const requestedBook: Book | undefined = bookService.findBookById(bookId);
    if (!requestedBook) {
      return res.status(404).json({ message: "Book not found" });
    }
  }
}
