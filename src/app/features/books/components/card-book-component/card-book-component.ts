import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import type { Book } from '../../../../core/interfaces/book-interface';

@Component({
  selector: 'card-book-component',
  imports: [RouterLink],
  templateUrl: './card-book-component.html',
})
export class CardBookComponent {
  book = input.required<Book>();
}
