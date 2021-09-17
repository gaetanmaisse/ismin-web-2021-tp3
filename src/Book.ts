export interface Book {
  readonly title: string;
  readonly author: string;
  readonly date: Date;
}

export interface APIBook {
  readonly title: string;
  readonly authors: string;
  readonly num_pages: string;
  readonly publisher: string;
  readonly language_code: string;
  readonly publication_date: Date;
}

/*"title": "Harry Potter and the Order of the Phoenix (Harry Potter  #5)",
  "authors": "J.K. Rowling/Mary GrandPré",
  "num_pages": "870",
  "publisher": "Scholastic Inc.",
  "language_code": "eng",
  "publication_date": "9/1/2004"*/
