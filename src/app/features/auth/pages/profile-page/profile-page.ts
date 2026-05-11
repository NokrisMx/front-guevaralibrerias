import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../interfaces/user-interface';
import { MenuProfileComponent } from '../../components/menu-profile-component/menu-profile-component';
import { HeroProfileComponent } from '../../components/hero-profile-component/hero-profile-component';

@Component({
  selector: 'profile-page',
  imports: [FormsModule, MenuProfileComponent, HeroProfileComponent],
  templateUrl: './profile-page.html',
})
export class ProfilePage {
  private authService = inject(AuthService);

  editing = signal<boolean>(false);
  isLoading = signal<boolean>(true);
  user = signal<User | null>(null);
  editableUser = signal<User | null>(null);
  errorMsg = signal<string>('');
  successMsg = signal<string>('');

  ngOnInit(): void {
    const id = this.authService.user()?.id;
    if (!id) return;

    this.authService.getUserById(id).subscribe({
      next: (data) => {
        this.user.set(data.data);
        this.editableUser.set({ ...data.data });
        this.isLoading.set(false);
      },
      error: () => this.isLoading.set(false),
    });
  }

  toggleEdit() {
    this.editing.update((v) => !v);
  }

  save() {
    const body = this.editableUser()!;

    this.errorMsg.set('');
    this.successMsg.set('');

    this.authService.updateUser(body).subscribe({
      next: (updated) => {
        this.user.set(updated.data);
        this.editableUser.set({ ...updated.data });

        this.authService.updateStoredUser(updated.data);

        this.editing.set(false);

        this.successMsg.set('Perfil actualizado correctamente');

        setTimeout(() => {
          this.successMsg.set('');
        }, 2000);
      },

      error: (err) => {
        this.errorMsg.set(err.error?.message ?? 'Error al actualizar el perfil');

        setTimeout(() => {
          this.errorMsg.set('');
        }, 2000);
      },
    });
  }
}
