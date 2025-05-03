import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiEndpoint } from '../../models/api-endpoints';

@Injectable({
  providedIn: 'root'
})
export class ApiDocService {
  readonly endpoints = signal<ApiEndpoint[]>([]);

  private http = inject(HttpClient);

  constructor() {
    this.http.get<ApiEndpoint[]>('../../../assets/apidoc/api-doc.json').subscribe(data => {
      this.endpoints.set(data);
    });
  }
}