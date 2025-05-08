import { Component, inject } from '@angular/core';
import { ApiDocService } from '../../core/services/api-doc.services';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from '../../shared/components/loader/loader.component';

@Component({
  selector: 'app-doc-list',
  imports: [CommonModule,LoaderComponent],
  templateUrl: './doc-list.component.html',
  styleUrl: './doc-list.component.scss'
})
export class DocListComponent {
  readonly endpoints = inject(ApiDocService).endpoints;

  stringify(obj: any): string {
    return JSON.stringify(obj, null, 2);
  }
}