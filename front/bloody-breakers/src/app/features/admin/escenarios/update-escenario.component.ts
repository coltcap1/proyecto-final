import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EscenariosService } from '../../../core/services/escenarios.service';
import { MundosService } from '../../../core/services/mundos.service';
import { Escenario } from '../../../models/escenario.model';
import { Mundo } from '../../../models/mundo.model';

@Component({
  selector: 'app-update-escenario',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './update-escenario.component.html',
})
export class UpdateEscenarioComponent implements OnInit {
  private escenarioService = inject(EscenariosService);
  private mundoService = inject(MundosService);
  private fb = inject(FormBuilder);

  readonly escenarios = signal<Escenario[]>([]);
  readonly mundos = signal<Mundo[]>([]);
  readonly seleccionadoId = signal<number | null>(null);
  readonly mensaje = signal<string | null>(null);
  readonly error = signal<string | null>(null);

  escenarioSeleccionado: Escenario | null = null;

  readonly form: FormGroup = this.fb.group({
    nombre: ['', Validators.required],
    id_mundo: [null, Validators.required]
  });

  ngOnInit(): void {
    this.escenarioService.getAll().subscribe({
      next: data => this.escenarios.set(data),
      error: () => this.error.set('Error al cargar los escenarios')
    });

    this.mundoService.getAll().subscribe({
      next: data => this.mundos.set(data),
      error: () => this.error.set('Error al cargar los mundos')
    });
  }

  seleccionar(id: number): void {
    this.seleccionadoId.set(id);
    const escenario = this.escenarios().find(e => e.id == id);
    this.escenarioSeleccionado = escenario ?? null;

    if (escenario) {
      this.form.patchValue({
        nombre: escenario.nombre,
        id_mundo: escenario.MUNDOS.id
      });
    } else {
      this.form.reset();
    }
  }

  actualizar(): void {
    const id = this.seleccionadoId();
    if (!id || this.form.invalid) return;

    const payload = this.form.value;

    this.escenarioService.update(id, payload as Escenario).subscribe({
      next: () => this.mensaje.set('Escenario actualizado correctamente'),
      error: () => this.error.set('Error al actualizar el escenario')
    });
  }
}
