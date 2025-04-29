import { Personaje } from '../personaje.model';

export function adaptPersonaje(data: Partial<Personaje>): Personaje {
  return {
    id: data.id ?? 0,
    nombre: data.nombre ?? '',
    esEnemigo: data.esEnemigo ?? false,
    historia: data.historia ?? '',
    iconoUrl: data.iconoUrl ?? '',
    mundo: data.mundo ?? '',
    imagenes: data.imagenes ?? []
  };
}
