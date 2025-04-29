import { Escenario } from '../escenario.model';

export function adaptEscenario(data: Partial<Escenario>): Escenario {
  return {
    id: data.id ?? 0,
    nombre: data.nombre ?? '',
    mundo: data.mundo ?? '',
    imagenes: data.imagenes ?? []
  };
}
