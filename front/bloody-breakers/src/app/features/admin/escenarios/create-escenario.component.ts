import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Mundo } from '../../../models/mundo.model';
import { EscenariosService } from '../../../core/services/escenarios.service';
import { MundosService } from '../../../core/services/mundos.service';

@Component({
  selector: 'app-create-escenario',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-escenario.component.html'
})
export class CreateEscenarioComponent implements OnInit {
  private fb = inject(FormBuilder);
  private escenarioService = inject(EscenariosService);
  private mundoService = inject(MundosService);
  private router = inject(Router);

  readonly escenarioForm: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    id_mundo: [null, Validators.required]
  });

  readonly mundos = signal<Mundo[]>([]);
  readonly creado = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.mundoService.getAll().subscribe({
      next: (data) => this.mundos.set(data),
      error: () => this.error.set('Error al cargar mundos')
    });
  }

  onSubmit(): void {
    if (this.escenarioForm.invalid) return;

    this.escenarioService.create(this.escenarioForm.value).subscribe({
      next: () => {
        this.creado.set(true);
        this.router.navigate(['/escenarios']);
      },
      error: (e) => {
        this.error.set('Error al crear escenario');
        console.error(e);
      }
    });
  }
}
