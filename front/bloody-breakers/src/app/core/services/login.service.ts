import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private http = inject(HttpClient);

  private apiUrl = 'https://proyecto-final-wzmt.onrender.com/api/auth/login';

  // 🔁 Signals reactivas
  private jwt = signal<string | null>(sessionStorage.getItem('jwt'));
  private rol = signal<string | null>(sessionStorage.getItem('rol'));

  // 🧠 Computadas reactivas
  readonly isLoggedIn = computed(() => !!this.jwt());
  readonly isAdmin = computed(() => this.rol() == '1');

  login(credentials: { email: string; password: string }): Observable<{ token: string; rol: string }> {
    return this.http.post<{ token: string; rol: string }>(this.apiUrl, credentials);
  }

  guardarCredenciales(token: string, rol: string): void {
    sessionStorage.setItem('jwt', token);
    sessionStorage.setItem('rol', rol);
    this.jwt.set(token);
    this.rol.set(rol);
  }

  logout(): void {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('rol');
    this.jwt.set(null);
    this.rol.set(null);
  }

  obtenerToken(): string | null {
    return this.jwt();
  }

  obtenerRol(): string | null {
    return this.rol();
  }
}
