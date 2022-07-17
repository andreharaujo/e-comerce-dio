import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Book } from 'src/app/models/Book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  getBooks() {
    throw new Error('Method not implemented.');
  }

  url = 'https://servicodados.ibge.gov.br/api/v1/produtos/estatisticas'; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  getCars(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

 
  getBookById(id: number): Observable<Book> {
    return this.httpClient.get<Book>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  saveBook(Book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.url, JSON.stringify(Book), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }


  updateBook(Book: Book): Observable<Book> {
    return this.httpClient.put<Book>(this.url + '/' + Book.id, JSON.stringify(Book), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

 
  deleteBook(Book: Book) {
    return this.httpClient.delete<Book>(this.url + '/' + Book.id, this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };

}