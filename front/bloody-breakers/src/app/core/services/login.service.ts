import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private http = inject(HttpClient);

  private apiUrl = 'https://proyecto-final-wzmt.onrender.com/api/auth/login';

  login(credentials: { email: string; password: string }): Observable<{ token: string; rol: string }> {
    return this.http.post<{ token: string; rol: string }>(this.apiUrl, credentials);
  }

  guardarCredenciales(token: string, rol: string): void {
    sessionStorage.setItem('jwt', token);
    sessionStorage.setItem('rol', rol);
  }

  logout(): void {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('rol');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('jwt');
  }

  isAdmin(): boolean {
    return sessionStorage.getItem('rol') == '1';
  }

  obtenerToken(): string | null {
    return sessionStorage.getItem('jwt');
  }

  obtenerRol(): string | null {
    return sessionStorage.getItem('rol');
  }
}
