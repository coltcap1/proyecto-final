// services/api-doc.service.ts
import { inject, Injectable, signal } from '@angular/core';
import { ApiEndpoint } from '../../models/api-endpoint';
import { HttpClient } from '@angular/common/http';

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
