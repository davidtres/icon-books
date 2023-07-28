import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../interface/book';
// import {} from '';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class BookServiceService {
  constructor(private http: HttpClient) {}
  // Ontener todos los libros
  public getBooks() {
    const url =
      'https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books';
    return this.http.get<Book[]>(url);
  }
  // Buscar libro por titulo
  public searchBooks(title: string) {
    return this.getBooks().pipe(
      map((books) =>
        books.filter((book) => {
          return book.title.toUpperCase().includes(title.toUpperCase());
        })
      )
    );
  }
  // Actualizar estado de un libro a leido
  //API responde con la autualización, pero no se guarda realmente.
  public updateBookStatus(id: number, status: any) {
    const url =
      'https://my-json-server.typicode.com/dmitrijt9/book-api-mock/books/';
    return this.http
      .patch<Book>(`${url}/${id}`, status)
      .subscribe((response) => {
        console.log(response);
      });
  }
}
