import { IsNotEmpty, IsString } from 'class-validator';

export class BookDto {
  @IsNotEmpty()
  readonly title: string;
  @IsNotEmpty()
  readonly author: string;

  @IsNotEmpty()
  @IsString()
  readonly date: Date;
}
