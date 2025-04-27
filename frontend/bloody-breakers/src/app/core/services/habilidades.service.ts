import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Habilidad } from '../../models/habilidad.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HabilidadesService {

  // private apiUrl = 'http://localhost:3000/habilidades';

  // private http = inject(HttpClient);

  // getAll(): Observable<Habilidad[]> {
  //   return this.http.get<Habilidad[]>(this.apiUrl);
  // }

  // getById(id: number): Observable<Habilidad> {
  //   return this.http.get<Habilidad>(`${this.apiUrl}/${id}`);
  // }

  // create(habilidad: Habilidad): Observable<Habilidad> {
  //   return this.http.post<Habilidad>(this.apiUrl, habilidad);
  // }

  // update(id: number, habilidad: Habilidad): Observable<Habilidad> {
  //   return this.http.put<Habilidad>(`${this.apiUrl}/${id}`, habilidad);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }
}
