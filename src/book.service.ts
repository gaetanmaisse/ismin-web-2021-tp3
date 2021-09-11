import { Injectable, OnModuleInit } from '@nestjs/common';
import { Book } from './Book';
import { readFile } from 'fs/promises';

@Injectable()
export class BookService implements OnModuleInit {
  private readonly bookStorage = new Map<string, Book>();

  onModuleInit() {
    return readFile(`${__dirname}/dataset.json`)
      .then((dataset) => {
        return JSON.parse(dataset.toString()) as Book[];
      })
      .then((books) => {
        books.forEach((book) => this.addBook(book));
      });
  }

  addBook(book: Book): void {
    this.bookStorage.set(book.title, book);
  }

  getBook(name: string): Book {
    const foundBook = this.bookStorage.get(name);

    if (!foundBook) {
      throw new Error(`Not book found with name ${name}`);
    }

    return foundBook;
  }

  getBooksOf(author: string): Book[] {
    return this.getAllBooks().filter((book) => {
      return book.author === author;
    });
  }

  getAllBooks(): Book[] {
    return Array.from(this.bookStorage.values()).sort((book1, book2) =>
      book1.title.localeCompare(book2.title),
    );
  }

  getTotalNumberOfBooks(): number {
    return this.bookStorage.size;
  }

  getBooksPublishedBefore(aDate: string | Date): Book[] {
    const dateCriterion = typeof aDate === 'string' ? new Date(aDate) : aDate;

    return this.getAllBooks().filter(
      (book) => book.date.getTime() <= dateCriterion.getTime(),
    );
  }

  deleteBook(bookTitle: string): void {
    this.bookStorage.delete(bookTitle);
  }

  searchByAuthorAndTitle(term: string) {
    const escapedTerm = term.toLowerCase().trim();

    return this.getAllBooks().filter((book) => {
      return (
        book.title.toLowerCase().includes(escapedTerm) ||
        book.author.toLowerCase().includes(escapedTerm)
      );
    });
  }
}
