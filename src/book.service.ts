import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Book } from './Book';
import { readFile } from 'fs/promises';
import { HttpService } from '@nestjs/axios';
import { ExternalBook } from './ExternalBook';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class BookService implements OnModuleInit {
  private readonly bookStorage = new Map<string, Book>();
  private readonly logger = new Logger(BookService.name);

  constructor(private readonly httpService: HttpService) {}

  async onModuleInit(): Promise<void> {
    const dataset = await readFile(`${__dirname}/dataset.json`);

    const books = JSON.parse(dataset.toString()) as any[];
    books
      .map((bookFromFile) => {
        const convertedBook: Book = {
          title: bookFromFile.title,
          author: bookFromFile.author,
          date: new Date(bookFromFile.date),
        };
        return convertedBook;
      })
      .forEach((book) => this.addBook(book));

    const externalBooks = await firstValueFrom(
      this.httpService
        .get<ExternalBook[]>('https://api.npoint.io/40518b0773c787f94072')
        .pipe(map((response) => response.data)),
    );

    externalBooks
      .map((externalBook) => {
        const convertedBook: Book = {
          title: externalBook.title,
          author: externalBook.authors,
          date: new Date(externalBook.publication_date),
        };
        return convertedBook;
      })
      .forEach((book) => this.addBook(book));

    this.logger.log(`There are ${this.bookStorage.size} books in the storage.`);
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
