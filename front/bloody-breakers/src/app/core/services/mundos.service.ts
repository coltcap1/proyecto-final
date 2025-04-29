import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mundo } from '../../models/mundo.model';
import { map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MundosService {

  // private apiUrl = 'http://localhost:3000/mundos'; // 🔥 Ajusta a tu backend real

  // private http = inject(HttpClient);

  // getAll(): Observable<Mundo[]> {
  //   return this.http.get<Mundo[]>(this.apiUrl).pipe(
  //     map(response => response.map(adaptMundo))
  //   )
  // }

  // getById(id: number): Observable<Mundo> {
  //   return this.http.get<Mundo>(`${this.apiUrl}/${id}`);
  // }

  // create(mundo: Mundo): Observable<Mundo> {
  //   return this.http.post<Mundo>(this.apiUrl, mundo);
  // }

  // update(id: number, mundo: Mundo): Observable<Mundo> {
  //   return this.http.put<Mundo>(`${this.apiUrl}/${id}`, mundo);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  getMockMundos(): Observable<Mundo[]> {
    const mockMundos: Mundo[] = [
      {
        id: 1,
        nombre: 'Mundo de los Sueños',
        historia: 'Un mundo lleno de criaturas fantásticas y aventuras imposibles.',
        imagenes: [
          {
            id: 1,
            url: 'https://i.imgur.com/qLCFrsO.jpeg',
            tipoEntidad: 'MUNDO',
            nombreEntidad: 'Mundo de los Sueños',
            nombre: 'Imagen principal de Mundo de los Sueños',
            fechaSubida: new Date().toISOString(),
            descripcion: ''
          }
        ]
      },
      {
        id: 2,
        nombre: 'Mundo de las Sombras',
        historia: 'Un lugar oscuro donde solo los más valientes sobreviven.',
        imagenes: []
      },
      {
        id: 3,
        nombre: 'Mundo del Tiempo',
        historia: 'Donde el pasado, presente y futuro se entrelazan en un solo instante.',
        imagenes: [
          {
            id: 2,
            url: 'https://i.imgur.com/UqEGXsl.jpeg',
            tipoEntidad: 'MUNDO',
            nombreEntidad: 'Mundo del Tiempo',
            nombre: 'Imagen del Mundo del Tiempo',
            fechaSubida: new Date().toISOString(),
            descripcion: ''
          }
        ]
      }
    ];

    return of(mockMundos);
  }

}
