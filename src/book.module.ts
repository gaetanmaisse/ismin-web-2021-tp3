import { HttpModule, Module } from '@nestjs/common';
import { BookController } from './book.controller';
import { BookService } from './book.service';

@Module({
  imports: [HttpModule],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
