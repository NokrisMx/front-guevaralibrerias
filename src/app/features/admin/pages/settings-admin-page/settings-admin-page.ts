import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'settings-admin-page',
  imports: [FormsModule],
  templateUrl: './settings-admin-page.html',
})
export class SettingsAdminPage {
  private authService = inject(AuthService);

  user = signal(this.authService.user());

  // Perfil
  nameModel = signal(this.user()?.name ?? '');
  usernameModel = signal(this.user()?.username ?? '');
  emailModel = signal(this.user()?.email ?? '');
  phoneNumberModel = signal(this.user()?.phoneNumber ?? '');

  profileLoading = signal(false);
  profileSuccessMsg = signal('');
  profileErrorMsg = signal('');

  // Contraseña
  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');
  showCurrent = signal(false);
  showNew = signal(false);
  showConfirm = signal(false);

  passwordLoading = signal(false);
  passwordSuccessMsg = signal('');
  passwordErrorMsg = signal('');

  saveProfile() {
    this.profileLoading.set(true);
    this.profileSuccessMsg.set('');
    this.profileErrorMsg.set('');

    const body = {
      name: this.nameModel(),
      username: this.usernameModel(),
      email: this.emailModel(),
      phoneNumber: this.phoneNumberModel(),
    };

    this.authService.updateUser(body).subscribe({
      next: (res) => {
        this.authService.updateStoredUser(res.data);
        this.profileLoading.set(false);
        this.profileSuccessMsg.set('Perfil actualizado correctamente.');
        setTimeout(() => this.profileSuccessMsg.set(''), 3000);
      },
      error: (err) => {
        this.profileLoading.set(false);
        const errors: string[] = err.error?.errors ?? ['Error al actualizar el perfil.'];
        this.profileErrorMsg.set(errors.join(', '));
      },
    });
  }

  changePassword() {
    if (!this.currentPassword().trim()) {
      this.passwordErrorMsg.set('Ingresa tu contraseña actual.');
      return;
    }
    if (!this.newPassword().trim()) {
      this.passwordErrorMsg.set('Ingresa la nueva contraseña.');
      return;
    }
    if (this.newPassword().length < 8) {
      this.passwordErrorMsg.set('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (this.newPassword() !== this.confirmPassword()) {
      this.passwordErrorMsg.set('Las contraseñas no coinciden.');
      return;
    }

    this.passwordLoading.set(true);
    this.passwordErrorMsg.set('');
    this.passwordSuccessMsg.set('');

    // ← elimina el const body que estaba aquí, ya no se necesita

    this.authService
      .changePassword(this.currentPassword(), this.newPassword(), this.confirmPassword())
      .subscribe({
        next: () => {
          this.passwordLoading.set(false);
          this.passwordSuccessMsg.set('Contraseña actualizada correctamente.');
          this.currentPassword.set('');
          this.newPassword.set('');
          this.confirmPassword.set('');
          setTimeout(() => this.passwordSuccessMsg.set(''), 3000);
        },
        error: (err) => {
          this.passwordLoading.set(false);
          const errors: string[] = err.error?.errors ?? ['Error al cambiar la contraseña.'];
          this.passwordErrorMsg.set(errors.join(', '));
        },
      });
  }
}
