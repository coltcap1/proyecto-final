import { Component, Input, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-formulario-generico',
  imports: [],
  templateUrl: './formulario-generico.component.html',
  styleUrl: './formulario-generico.component.scss'

})
export class FormularioGenericoComponent implements OnInit {
  // Recibe el modelo base que define los campos del formulario
  @Input({ required: true }) modeloBase!: Record<string, any>;

  // Recibe el servicio que se utilizará para guardar los datos (debe tener un método `crear`)
  @Input({ required: true }) servicio!: { create: (obj: any) => any };

  // Estado reactivo que contiene los datos que se van editando en el formulario
  readonly datos = signal<Record<string, any>>({});

  // Mensaje de error en caso de validación fallida o error en el guardado
  readonly error = signal<string | null>(null);

  // Inicializa los datos con una copia del modelo base
  ngOnInit() {
    this.datos.set({ ...this.modeloBase });
  }

  // Actualiza un campo específico del objeto `datos`
  actualizarCampo(campo: string, valor: any) {
    // Validación para campos que son URL (terminan en "Url")
    if (campo.toLowerCase().endsWith('url')) {
      if (!this.esUrlImgurValida(valor)) {
        this.error.set(`La URL de "${campo}" debe ser un enlace válido de Imgur.`);
        return;
      }
    }

    this.error.set(null); // limpia errores anteriores
    this.datos.update(d => ({ ...d, [campo]: valor }));
  }

  // Verifica que todos los campos visibles estén completos (excepto 'id' y 'imagenes')
  camposValidos(): boolean {
    const valores = this.datos();
    return Object.keys(this.modeloBase).every(key => {
      if (key === 'id' || key === 'imagenes') return true; // Ignora estos campos
      const val = valores[key];
      return val !== null && val !== undefined && val !== ''; // Campo obligatorio
    });
  }

//Verifica que es un URL proveniente de Imgur
  esUrlImgurValida(url: string): boolean {
    const imgurRegex = /^https:\/\/i\.imgur\.com\/[\w-]+\.(jpg|jpeg|png|gif|webp)$/i;
    return imgurRegex.test(url.trim());
  }

  // Si el campo es tipo URL y válida, devuelve la URL para mostrarla
  obtenerPrevisualizacion(campo: string): string | null {
    const valor = this.datos()[campo];
    return campo.toLowerCase().endsWith('url') && this.esUrlImgurValida(valor) ? valor : null;
  }

  // Llama al método `create` del servicio si los datos son válidos
  guardar() {
    if (!this.camposValidos()) {
      this.error.set('Por favor, completa todos los campos.');
      return;
    }

    this.error.set(null); // Limpia errores anteriores
    try {
      const resultado = this.servicio.create(this.datos());
      console.log('Creado correctamente:', resultado);
    } catch (e) {
      this.error.set('Ocurrió un error al guardar.');
      console.error(e);
    }
  }

  get clavesModelo(): string[] {
    return Object.keys(this.modeloBase || {});
  }

}
