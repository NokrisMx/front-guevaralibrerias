import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'profile-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './profile-page.html',
})
export class ProfilePage {
  editing = signal(false);
  saved = signal(false);
  user = signal({
    name: 'Ana García',
    username: 'anagarcia',
    email: 'ana@correo.com',
    phone: '+52 81 9876 5432',
  });
  toggleEdit() {
    this.editing.update((v) => !v);
  }
  save() {
    this.editing.set(false);
    this.saved.set(true);
    setTimeout(() => this.saved.set(false), 2500);
  }
}
