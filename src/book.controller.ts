import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './Book';
import { BookDto } from './BookDto';

@Controller('/books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  public getAllBooks(@Query('author') author: string): Book[] {
    return author
      ? this.bookService.getBooksOf(author)
      : this.bookService.getAllBooks();
  }

  @Post()
  public createBook(@Body() bookToCreate: BookDto): Book {
    this.bookService.addBook(bookToCreate);
    return this.bookService.getBook(bookToCreate.title);
  }

  @Get(':title')
  public getBookWithTitle(@Param('title') bookTitle: string): Book {
    return this.bookService.getBook(bookTitle);
  }

  @Delete(':title')
  public deleteBook(@Param('title') bookTitle: string): void {
    return this.bookService.deleteBook(bookTitle);
  }

  @Post('search')
  @HttpCode(200)
  public searchByAuthorAndTitle(@Body() query: { term: string }): Book[] {
    return this.bookService.searchByAuthorAndTitle(query.term);
  }
}
