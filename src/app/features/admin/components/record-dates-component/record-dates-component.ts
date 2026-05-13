import { Component, input } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'record-dates',
  imports: [DatePipe],
  templateUrl: './record-dates-component.html',
})
export class RecordDates {
  createdAt = input<string | null>(null);
  updatedAt = input<string | null>(null);
}
