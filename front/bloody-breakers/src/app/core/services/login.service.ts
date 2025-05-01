import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoginService {
  // private http = inject(HttpClient);

  // private apiUrl = 'https://TU-BACKEND.com/api/login';

  login(credentials: { email: string; password: string }): Observable<{ token: string; role: string }> {
    // return this.http.post<{ token: string; role: string }>(this.apiUrl, credentials);
    return of({token:'es Solo un token MOCK', role:'señor'});
  }

  guardarToken(token: string): void {
    sessionStorage.setItem('jwt', token);
  }

  logout(): void {
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('role');
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('jwt');
  }
}
