import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Solo modificamos si no es GET
  if (req.method === 'GET') return next(req);

  const token = sessionStorage.getItem('jwt');

  // Si no hay token, dejamos pasar sin modificar (podrías bloquear aquí si lo deseas)
  if (!token) return next(req);

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

  return next(authReq);
};
