import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'register-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './register-page.html',
})
export class RegisterPage {
  name = signal('');
  email = signal('');
  password = signal('');
  confirmPass = signal('');
  onSubmit() {
    console.log('Register', this.email());
  }
}
