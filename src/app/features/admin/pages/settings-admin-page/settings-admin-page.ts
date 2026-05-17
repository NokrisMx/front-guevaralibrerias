import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { AlertService } from '../../../../shared/services/alert.service';

@Component({
  selector: 'settings-admin-page',
  imports: [FormsModule],
  templateUrl: './settings-admin-page.html',
})
export class SettingsAdminPage {
  private authService = inject(AuthService);
  private alertService = inject(AlertService);

  user = signal(this.authService.user());

  // Perfil
  nameModel = signal(this.user()?.name ?? '');
  usernameModel = signal(this.user()?.username ?? '');
  emailModel = signal(this.user()?.email ?? '');
  phoneNumberModel = signal(this.user()?.phoneNumber ?? '');

  profileLoading = signal(false);

  // Contraseña
  currentPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');
  showCurrent = signal(false);
  showNew = signal(false);
  showConfirm = signal(false);

  passwordLoading = signal(false);
  passwordErrorMsg = signal('');

  saveProfile() {
    this.profileLoading.set(true);

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
        this.alertService.success(res.message);
      },
      error: (err) => {
        this.profileLoading.set(false);
        this.alertService.error(
          err.error.message ?? 'Error al actualizar el perfil, intenta de nuevo.',
        );
      },
    });
  }

  changePassword() {
    if (!this.currentPassword().trim()) {
      this.passwordErrorMsg.set('Ingresa tu contraseña actual.');
      this.alertService.error(this.passwordErrorMsg());
      return;
    }
    if (!this.newPassword().trim()) {
      this.passwordErrorMsg.set('Ingresa la nueva contraseña.');
      this.alertService.error(this.passwordErrorMsg());
      return;
    }
    if (this.newPassword().length < 8) {
      this.passwordErrorMsg.set('La contraseña debe tener al menos 8 caracteres.');
      this.alertService.error(this.passwordErrorMsg());
      return;
    }
    if (this.newPassword() !== this.confirmPassword()) {
      this.passwordErrorMsg.set('Las contraseñas no coinciden.');
      this.alertService.error(this.passwordErrorMsg());
      return;
    }

    this.passwordLoading.set(true);
    this.passwordErrorMsg.set('');

    const body = {
      currentPassword: this.currentPassword(),
      newPassword: this.newPassword(),
      confirmPassword: this.confirmPassword(),
    };

    this.authService.changePassword(body).subscribe({
      next: (res) => {
        this.passwordLoading.set(false);
        this.currentPassword.set('');
        this.newPassword.set('');
        this.confirmPassword.set('');
        this.alertService.success(res.message);
      },
      error: (err) => {
        this.passwordLoading.set(false);
        this.alertService.error(err.error?.message ?? 'Error al cambiar la contraseña.');
      },
    });
  }
}
