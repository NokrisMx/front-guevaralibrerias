import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertService {
  success(message: string) {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: message,
      timer: 2500,
      showConfirmButton: false,
      timerProgressBar: true,
      toast: true,
      position: 'top-end',
    });
  }

  error(message: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: message,
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#02332D',
    });
  }

  async confirm(message: string): Promise<boolean> {
    const result = await Swal.fire({
      icon: 'warning',
      title: '¿Estás seguro?',
      text: message,
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#02332D',
    });
    return result.isConfirmed;
  }
}
