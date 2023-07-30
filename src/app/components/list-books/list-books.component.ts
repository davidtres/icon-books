import { Component, OnInit } from '@angular/core';
import { BookServiceService } from 'src/app/services/book-service.service';
import { Observable } from 'rxjs';
import { Book } from 'src/app/interface/book';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css'],
})
export class ListBooksComponent implements OnInit {
  public formGroup!: FormGroup; //variable para formulario
  imgVacio = 'assets/img/libro.jpeg';
  listBooks$: Observable<Book[]> = new Observable<Book[]>();
  bookSeleted: Book | undefined;
  status = {
    detalle: false,
  };
  constructor(
    private bookService: BookServiceService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.buildForm();
    this.getBooks();
    this.getInputSearch();
  }
  private buildForm() {
    this.formGroup = this.formBuilder.group({
      search: [],
    });
  }
  // Escucha input de busqueda
  getInputSearch() {
    this.formGroup.get('search')?.valueChanges.subscribe((data) => {
      this.searchBook(data);
    });
  }
  //Obtener lista de libro completa
  getBooks() {
    this.listBooks$ = this.bookService.getBooks();
  }
  //Filtrar libros por titulo y actualizar la lista
  searchBook(title: string) {
    this.listBooks$ = this.bookService.searchBooks(title);
  }
  //marcar como leido un libro, se verifica primero si existe la propiedad "read" para luego actualizarla o crearla.
  //En Html muestra leido o no, por medio de ng-templete
  checkLeido(item: Book) {
    const status = {
      read: item.read ? !item.read : true,
    };
    const id = item.id;
    this.bookService.updateBookStatus(id, status);
  }
  // Ver detalles del libro por componente hijo
  viewBook(item?: Book) {
    this.status.detalle = !this.status.detalle;
    this.bookSeleted = item ?? undefined;
  }
}
