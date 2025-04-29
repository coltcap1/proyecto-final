import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personaje } from '../../models/personaje.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonajesService {

  // private apiUrl = 'http://localhost:3000/personajes';

  // private http = inject(HttpClient);

  // getAll(): Observable<Personaje[]> {
  //   return this.http.get<Personaje[]>(this.apiUrl);
  // }

  // getById(id: number): Observable<Personaje> {
  //   return this.http.get<Personaje>(`${this.apiUrl}/${id}`);
  // }

  // create(personaje: Personaje): Observable<Personaje> {
  //   return this.http.post<Personaje>(this.apiUrl, personaje);
  // }

  // update(id: number, personaje: Personaje): Observable<Personaje> {
  //   return this.http.put<Personaje>(`${this.apiUrl}/${id}`, personaje);
  // }

  // delete(id: number): Observable<void> {
  //   return this.http.delete<void>(`${this.apiUrl}/${id}`);
  // }

  getMockPersonajes(): Observable<Personaje[]> {
    const mock: Personaje[] = [
      {
        id: 1,
        nombre: 'Kael el Guerrero',
        esEnemigo: false,
        historia: 'Un luchador legendario que protege el Mundo de las Sombras.',
        iconoUrl: 'https://i.imgur.com/3ZzXnOB.jpeg',
        mundo: 'Mundo de las Sombras',
        imagenes: [
          {
            id: 101,
            url: 'https://i.imgur.com/5CKCzr6.jpeg',
            tipoEntidad: 'PERSONAJE',
            nombreEntidad: 'Kael el Guerrero',
            nombre: 'Retrato oficial',
            fechaSubida: new Date().toISOString(),
            descripcion: 'Kael con su armadura ceremonial.'
          }
        ]
      },
      {
        id: 2,
        nombre: 'Mira la Hechicera',
        esEnemigo: false,
        historia: 'Controla el flujo del tiempo y guarda los secretos del bosque.',
        iconoUrl: 'https://i.imgur.com/yefChhv.jpeg',
        mundo: 'Mundo del Tiempo',
        imagenes: []
      },
      {
        id: 3,
        nombre: 'Zarok el Devastador',
        esEnemigo: true,
        historia: 'Un enemigo colosal surgido de los sueños más oscuros.',
        iconoUrl: 'https://i.imgur.com/r0V1Zlv.png',
        mundo: 'Mundo de los Sueños',
        imagenes: [
          {
            id: 103,
            url: 'https://i.imgur.com/RTdltp5.jpeg',
            tipoEntidad: 'PERSONAJE',
            nombreEntidad: 'Zarok el Devastador',
            nombre: 'Amenaza en la niebla',
            fechaSubida: new Date().toISOString(),
            descripcion: 'Zarok emergiendo entre las sombras.'
          }
        ]
      }
    ];

    return of(mock);
  }

}
