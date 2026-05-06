import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'login-page',
  imports: [RouterLink, FormsModule],
  templateUrl: './login-page.html',
})
export class LoginPage {
  email = signal('');
  password = signal('');
  showPass = signal(false);
  onSubmit() {
    console.log('Login', this.email(), this.password());
  }
}
