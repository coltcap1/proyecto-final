import { Component, inject } from '@angular/core';
import { ApiDocService } from '../../core/services/api-doc.service';

@Component({
  selector: 'app-doc-list',
  imports: [],
  templateUrl: './doc-list.component.html',
  styleUrl: './doc-list.component.scss'
})
export class DocListComponent {
  readonly endpoints = inject(ApiDocService).endpoints;

  stringify(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }
}
