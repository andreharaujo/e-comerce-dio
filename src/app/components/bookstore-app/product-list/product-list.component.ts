import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/components/bookstore-app/product-list/product-list.component.service';
import { Book } from 'src/app/models/Book';
import { NgForm } from '@angular/forms';



@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class AppComponent implements OnInit {

  book = {} as Book;
  books!: Book[];

  constructor(private BooksService: BooksService) {}
  
  ngOnInit() {
    this.getBooks();
  }

  // defini se um book será criado ou atualizado
  saveCar(form: NgForm) {
    if (this.book.id !== undefined) {
      this.BooksService.updateBook(this.book).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.BooksService.saveBook(this.book).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos
  getBooks() {
    this.BooksService.getBooks().subscribe((book: Book[]) => {
      this.books = book;
    });
  }

  // deleta um carro
  deleteBook(book: Book) {
    this.BooksService.deleteBook(book).subscribe(() => {
      this.getBooks();
    });
  }

  // copia o carro para ser editado.
  editBook(book: Book) {
    this.book = { ...book };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getBooks();
    form.resetForm();
    this.book = {} as Book;
  }

}

