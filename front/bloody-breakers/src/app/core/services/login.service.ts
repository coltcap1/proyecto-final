import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioActual } from '../../models/usuarioActual.model';
interface LoginResponse {
  token: string;
  rol: string; // backend actual
}
@Injectable({ providedIn: 'root' })
export class LoginService {
  private http = inject(HttpClient);

  private loginUrl = 'https://proyecto-final-wzmt.onrender.com/api/auth/login';
  private meUrl = 'https://proyecto-final-wzmt.onrender.com/api/auth/me';

  private jwt = signal<string | null>(sessionStorage.getItem('jwt'));
  private user = signal<UsuarioActual | null>(this.cargarUsuario());

  readonly isLoggedIn = computed(() => !!this.jwt());
  readonly isAdmin = computed(() => this.user()?.rol.rol == 'admin');

  login(credentials: { email: string; password: string }): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials);
  }

  guardarCredenciales(token: string): void {
    sessionStorage.setItem('jwt', token);
    this.jwt.set(token);

    // Obtener info del usuario desde el backend
    this.http.get<UsuarioActual>(this.meUrl, {
      headers: { Authorization: `Bearer ${token}` }
    }).subscribe(usuario => {
      sessionStorage.setItem('user', JSON.stringify(usuario));
      this.user.set(usuario);
    });
  }

  logout(): void {
    sessionStorage.clear();
    this.jwt.set(null);
    this.user.set(null);
  }

  obtenerToken(): string | null {
    return this.jwt();
  }

  obtenerUsuario(): UsuarioActual | null {
    return this.user();
  }

  private cargarUsuario(): UsuarioActual | null {
    const stored = sessionStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  }
}