import { Mundo } from '../mundo.model';

export function adaptMundo(data: Partial<Mundo>): Mundo {
  return {
    id: data.id ?? 0,
    nombre: data.nombre ?? '',
    historia: data.historia ?? '',
    imagenes: data.imagenes ?? [],
  };
}
