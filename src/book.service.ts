import { Injectable, OnModuleInit } from '@nestjs/common';
import { Book } from './Book';
import { BookDto } from './BookDto';
import { readFile } from 'fs';

@Injectable()
export class BookService implements OnModuleInit {

  onModuleInit() {
    readFile('src/dataset.json',(err,data)=>{
      if(err) throw err;
      this.bookStorage = JSON.parse(data.toString());
      console.log(this.bookStorage)
    })
  }




  private bookStorage = new Map<string, Book>();

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
