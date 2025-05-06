import { HttpInterceptorFn } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
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

  switch (status) {
    case 400:
      console.warn('Solicitud incorrecta:', msg);
      break;
    case 401:
      console.warn('No autorizado:', msg);
      break;
    case 404:
      console.warn('No encontrado:', msg);
      break;
    case 500:
      console.error('Error interno del servidor:', msg);
      break;
    default:
      console.error(`Error HTTP ${status}:`, msg);
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
