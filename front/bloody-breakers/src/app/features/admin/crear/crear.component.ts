import { Component, inject } from '@angular/core';
import { FormularioGenericoComponent } from '../../../shared/components/formulario-generico/formulario-generico.component';

import { ActivatedRoute } from '@angular/router';
import { PersonajesService } from '../../../core/services/personajes.service';
import { MundosService } from '../../../core/services/mundos.service';
import { EscenariosService } from '../../../core/services/escenarios.service';
import { HabilidadesService } from '../../../core/services/habilidades.service';



@Component({
  selector: 'app-crear',
  imports: [FormularioGenericoComponent],
  templateUrl: './crear.component.html',
  styleUrl: './crear.component.scss'
})
export class CrearComponent {
  // Inyectamos el parámetro de la ruta (por ejemplo: 'personajes', 'enemigos', etc.)
  readonly route = inject(ActivatedRoute);
  // Objeto base que se utilizará para generar el formulario
  modeloBase!: Record<string, any>;

  // Servicio específico que se usará para guardar el objeto creado
  servicio!: { create: (obj: any) => any };

  ngOnInit() {
    // Obtenemos el valor de :entidad desde la URL
    const entidad = this.route.snapshot.paramMap.get('entidad');

    switch (entidad) {
      case 'personajes':
        this.modeloBase = {
          nombre: '',
          esEnemigo: false,
          historia: '',
          iconoUrl: '',
          mundo: '',
          imagenes: []
        };
        this.servicio = inject(PersonajesService);
        break;

      case 'enemigos':
        this.modeloBase = {
          nombre: '',
          esEnemigo: true,
          historia: '',
          iconoUrl: '',
          mundo: '',
          imagenes: []
        };
        this.servicio = inject(PersonajesService);
        break;

      case 'mundos':
        this.modeloBase = {
          nombre: '',
          historia: '',
          imagenes: []
        };
        this.servicio = inject(MundosService); // 👈 Inyección local
        break;

      case 'escenarios':
        this.modeloBase = {
          nombre: '',
          descripcion: '',
          mundo: '',
          imagenes: []
        };
        this.servicio = inject(EscenariosService);
        break;

      case 'habilidades':
        this.modeloBase = {
          nombre: '',
          dano: 0,
          iconoUrl: ''
        };
        this.servicio = inject(HabilidadesService);
        break;

      default:
        throw new Error(`Entidad desconocida: ${entidad}`);
    }
  }
}