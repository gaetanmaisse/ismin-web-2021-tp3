import { IsNotEmpty, IsString } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly author: string;

  @IsNotEmpty()
  @IsString()
  readonly date: Date;

  constructor(title: string, author: string, date: Date) {
    this.title = title;
    this.author = author;
    this.date = date;
  }
}
