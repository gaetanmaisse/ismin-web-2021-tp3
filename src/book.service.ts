import { Injectable, OnModuleInit } from '@nestjs/common';
import { Book, APIBook } from './Book';
import { map } from 'rxjs';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BookService implements OnModuleInit {
  constructor(private readonly http: HttpService) {}
  async onModuleInit() {
    this.http
      .get<APIBook[]>('https://api.npoint.io/40518b0773c787f94072')
      .pipe(map((response) => response.data))
      .subscribe((apiBooks) => {
        apiBooks.forEach((apiBook) => {
          const book: Book = {
            title: apiBook.title,
            author: apiBook.authors,
            date: apiBook.publication_date,
          };
          this.addBook(book);
        });
      });
  }

  private bookStorage: Map<string, Book> = new Map<string, Book>();

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

  searchByAuthorAndTitle(term: string): Book[] {
    const escapedTerm = term.toLowerCase().trim();

    return this.getAllBooks().filter((book) => {
      return (
        book.title.toLowerCase().includes(escapedTerm) ||
        book.author.toLowerCase().includes(escapedTerm)
      );
    });
  }
}
