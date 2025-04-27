import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mundo } from '../../models/mundo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MundosService {

  private apiUrl = 'http://localhost:3000/mundos'; // 🔥 Ajusta a tu backend real

  constructor(private http: HttpClient) {}

  getAll(): Observable<Mundo[]> {
    return this.http.get<Mundo[]>(this.apiUrl);
  }

  getById(id: number): Observable<Mundo> {
    return this.http.get<Mundo>(`${this.apiUrl}/${id}`);
  }

  create(mundo: Mundo): Observable<Mundo> {
    return this.http.post<Mundo>(this.apiUrl, mundo);
  }

  update(id: number, mundo: Mundo): Observable<Mundo> {
    return this.http.put<Mundo>(`${this.apiUrl}/${id}`, mundo);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
