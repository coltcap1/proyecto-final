import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Escenario } from '../../models/escenario.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EscenariosService {

  private apiUrl = 'http://localhost:3000/escenarios';

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

  getMockEscenarios(): Observable<Escenario[]> {
    const mock: Escenario[] = [
      {
        id: 1,
        nombre: 'Caverna del Eco',
        mundo: 'Mundo de las Sombras',
        imagenes: [
          {
            id: 1,
            url: 'https://i.imgur.com/JVlcWSb.jpeg',
            tipoEntidad: 'ESCENARIO',
            nombreEntidad: 'Caverna del Eco',
            nombre: 'Entrada de la caverna',
            fechaSubida: new Date().toISOString(),
            descripcion: 'La entrada principal con estalactitas gigantes.'
          }
        ]
      },
      {
        id: 2,
        nombre: 'Bosque del Tiempo',
        mundo: 'Mundo del Tiempo',
        imagenes: [] // sin imagen
      },
      {
        id: 3,
        nombre: 'Páramo de los Sueños',
        mundo: 'Mundo de los Sueños',
        imagenes: [
          {
            id: 2,
            url: 'https://i.imgur.com/zzgOqR0.jpeg',
            tipoEntidad: 'ESCENARIO',
            nombreEntidad: 'Páramo de los Sueños',
            nombre: 'Vista panorámica',
            fechaSubida: new Date().toISOString(),
            descripcion: 'Un paisaje onírico lleno de neblina y luz tenue.'
          }
        ]
      }
    ];

    return of(mock);
  }




}
