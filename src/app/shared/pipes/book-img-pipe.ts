import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';

@Pipe({ name: 'bookImg', standalone: true })
export class BookImgPipe implements PipeTransform {
  transform(url: string | null): string {
    if (!url) return 'assets/images/no-image.jpg';
    if (url.startsWith('http')) return url;
    return `${environment.mediaUrl}${url}`;
  }
}
