import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Escenario } from '../../models/escenario.model';
import { Observable, of } from 'rxjs';
import { genericServiceInterface } from '../../models/genericService.interface';

@Injectable({
  providedIn: 'root'
})
export class EscenariosService implements genericServiceInterface<Escenario>{

  private apiUrl = 'https://proyecto-final-wzmt.onrender.com/api/escenarios';

  private http = inject(HttpClient);

  getAll(): Observable<Escenario[]> {
    return this.http.get<Escenario[]>(this.apiUrl);
  }

  getById(id: number): Observable<Escenario> {
    return this.http.get<Escenario>(`${this.apiUrl}/${id}`);
  }

  create(escenario: Escenario): Observable<Escenario> {
    return this.http.post<Escenario>(this.apiUrl, escenario);
  }

  update(id: number, escenario: Escenario): Observable<Escenario> {
    return this.http.put<Escenario>(`${this.apiUrl}/${id}`, escenario);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
