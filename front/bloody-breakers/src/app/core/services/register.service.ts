import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class RegisterService {
  private http = inject(HttpClient);

  // 🔁 Reemplazá esta URL con la de tu backend real
  private apiUrl = 'https://proyecto-final-wzmt.onrender.com/api/auth/register';

  /**
   * Envía los datos de registro al backend
   */
  register(user: { email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
