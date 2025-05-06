import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Imagen } from '../../models/imagen.model';
import { Observable } from 'rxjs';
import { genericServiceInterface } from '../../models/genericService.interface';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService implements genericServiceInterface<Imagen>{

  private apiUrl = 'https://proyecto-final-wzmt.onrender.com/api/imagenes';

  private http = inject(HttpClient);

  getAll(): Observable<Imagen[]> {
    return this.http.get<Imagen[]>(this.apiUrl);
  }

  getById(id: number): Observable<Imagen> {
    return this.http.get<Imagen>(`${this.apiUrl}/${id}`);
  }

  create(imagen: Imagen): Observable<Imagen> {
    return this.http.post<Imagen>(this.apiUrl, imagen);
  }

  update(id: number, imagen: Imagen): Observable<Imagen> {
    return this.http.put<Imagen>(`${this.apiUrl}/${id}`, imagen);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
