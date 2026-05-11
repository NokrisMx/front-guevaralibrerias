import { Component, input } from '@angular/core';
import { User } from '../../interfaces/user-interface';

@Component({
  selector: 'hero-profile-component',
  imports: [],
  templateUrl: './hero-profile-component.html',
})
export class HeroProfileComponent {
  user = input.required<User>();
}
