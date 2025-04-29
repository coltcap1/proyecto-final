import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MundoComponent } from './mundo.component';
import { MundosService } from '../../core/services/mundos.service';
import { Mundo } from '../../models/mundo.model';
import { signal } from '@angular/core';

@Component({
  selector: 'app-mundo-list',
  standalone: true,
  imports: [CommonModule, MundoComponent],
  templateUrl: './mundo-list.component.html',
  styleUrls: ['./mundo-list.component.scss']
})
export class MundoListComponent implements OnInit {

  mundos = signal<Mundo[]>([]);

  private mundosService = inject(MundosService);

  ngOnInit(): void {
    this.mundosService.getMockMundos().subscribe({
      next: (data) => this.mundos.set(data),
      error: (err) => console.error('Error al cargar mundos:', err)
    });
  }
}
