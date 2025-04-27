import { Imagen } from './imagen.model';

export interface Personaje {
  id: number;
  nombre: string;
  esEnemigo: boolean;
  historia: string;
  iconoUrl: string;
  idMundo: number;
  imagenes: Imagen[]; // Lista de imágenes asociadas al personaje
}
