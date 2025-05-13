import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { tap } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    tap({
      error: (error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          handleHttpError(error);
        } else {
          console.error('Unknown error:', error);
        }
      },
    })
  );
};

function handleHttpError(error: HttpErrorResponse): void {
  const status = error.status;
  const msg = extractMessage(error);
  const toastr = inject(ToastrService);

  switch (status) {
    case 400:
      toastr.warning(msg, 'Solicitud incorrecta');
      break;
    case 401:
      toastr.error(msg, 'No autorizado');
      break;
    case 404:
      toastr.info(msg, 'No encontrado');
      console.log();
      
      break;
    case 500:
      toastr.error(msg, 'Error del servidor');
      break;
    default:
      toastr.error(msg, `Error HTTP ${status}`);
      break;
  }

  // Si quieres mostrar un modal/toast globalmente, puedes inyectar un servicio aquí
  // const notifier = inject(NotificationService);
  // notifier.showError(msg);
}

function extractMessage(error: HttpErrorResponse): string {
  if (error.error instanceof Blob) {
    return 'Respuesta binaria inesperada';
  }

  if (typeof error.error === 'string') return error.error;
  if (typeof error.error === 'object' && error.error?.message) return error.error.message;
  if (typeof error.error === 'object' && error.error?.error) return error.error.error;

  return 'Ha ocurrido un error inesperado';
}
