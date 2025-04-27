import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personaje } from '../../models/personaje.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  private apiUrl = 'http://localhost:3000/personajes';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(this.apiUrl);
  }

  getById(id: number): Observable<Personaje> {
    return this.http.get<Personaje>(`${this.apiUrl}/${id}`);
  }

  create(personaje: Personaje): Observable<Personaje> {
    return this.http.post<Personaje>(this.apiUrl, personaje);
  }

  update(id: number, personaje: Personaje): Observable<Personaje> {
    return this.http.put<Personaje>(`${this.apiUrl}/${id}`, personaje);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
