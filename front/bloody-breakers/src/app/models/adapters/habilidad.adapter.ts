import { Habilidad } from '../habilidad.model';

export function adaptHabilidad(data: Partial<Habilidad>): Habilidad {
  return {
    id: data.id ?? 0,
    nombre: data.nombre ?? '',
    dano: data.dano ?? 0,
    iconoUrl: data.iconoUrl ?? '',
    imagenes: data.imagenes ?? []
  };
}
