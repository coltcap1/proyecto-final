import { Component, inject } from '@angular/core';
import { ApiDocService } from '../../core/services/api-doc.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-doc-list',
  imports: [CommonModule],
  templateUrl: './doc-list.component.html',
  styleUrl: './doc-list.component.scss'
})
export class DocListComponent {
  readonly endpoints = inject(ApiDocService).endpoints;

  stringify(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }
}