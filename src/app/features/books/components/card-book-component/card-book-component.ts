import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Book } from '../../../../core/interfaces/book-interface';
import { CurrencyPipe } from '@angular/common';
import { BookImgPipe } from '../../../../shared/pipes/book-img-pipe';

@Component({
  selector: 'card-book-component',
  imports: [RouterLink, CurrencyPipe, BookImgPipe],
  templateUrl: './card-book-component.html',
})
export class CardBookComponent {
  book = input.required<Book>();
}
