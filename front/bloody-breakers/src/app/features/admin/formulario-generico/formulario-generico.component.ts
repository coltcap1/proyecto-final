import { Component, Input, signal } from '@angular/core';

@Component({
  selector: 'app-formulario-generico',
  imports: [],
  templateUrl: './formulario-generico.component.html',
  styleUrl: './formulario-generico.component.scss'

})
export class FormularioGenericoComponent {
  @Input({ required: true }) modeloBase!: Record<string, any>;
  @Input({ required: true }) servicio!: { create: (obj: any) => any };

  readonly datos = signal<Record<string, any>>({});
  readonly error = signal<string | null>(null);

  ngOnInit() {
    this.datos.set({ ...this.modeloBase });
  }

  actualizarCampo(campo: string, valor: any) {
    this.datos.update(d => ({ ...d, [campo]: valor }));
  }

  camposValidos(): boolean {
    const valores = this.datos();
    return Object.keys(this.modeloBase).every(key => {
      if (key === 'id' || key === 'imagenes') return true;
      const val = valores[key];
      return val !== null && val !== undefined && val !== '';
    });
  }

  guardar() {
    if (!this.camposValidos()) {
      this.error.set('Por favor, completa todos los campos.');
      return;
    }

    this.error.set(null);
    try {
      const resultado = this.servicio.create(this.datos());
      console.log('Creado correctamente:', resultado);
    } catch (e) {
      this.error.set('Ocurrió un error al guardar.');
      console.error(e);
    }
  }
}
