import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/interface/book';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css'],
})
export class BookDetailComponent implements OnInit {
  @Input() book: Book | undefined;
  imgVacio = 'assets/img/libro.jpeg';
  status = {
    params: false,
  };
  bookDetail: any;

  constructor(private router: ActivatedRoute) {
    router.queryParams.subscribe((q: any) => {
      const hasParams: number = Object.keys(q).length;
      this.status.params = hasParams > 0 ? true : false;
      this.bookDetail = q;
    });
  }

  ngOnInit(): void {}
  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    console.log(changes);
    this.bookDetail = changes?.['book']?.currentValue;
  }
}
