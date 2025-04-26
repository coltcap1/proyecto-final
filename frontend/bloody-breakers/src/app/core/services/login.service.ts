import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private http = inject(HttpClient);
  private router = inject(Router);

  //Aqui va la URL real
  private apiUrl = 'https://TU-BACKEND.com/api/login'; 

  constructor() {}

  /**
   * Llama a la API para hacer login
   * @param credentials Un objeto con email y password
   */
  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ token: string }>(this.apiUrl, credentials);
  }

  /**
   * Guarda el JWT en sessionStorage
   */
  guardarToken(token: string): void {
    sessionStorage.setItem('jwt', token);
  }

  /**
   * Borra el JWT y redirige a inicio
   */
  logout(): void {
    sessionStorage.removeItem('jwt');
    this.router.navigate(['/']);
  }

  /**
   * Comprueba si hay un token en sessionStorage
   */
  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('jwt');
  }
}
