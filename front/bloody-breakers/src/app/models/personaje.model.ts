import { Imagen } from './imagen.model';

export interface Personaje {
  id: number;
  nombre: string;
  esEnemigo: boolean;
  historia: string;
  iconoUrl: string;
  mundo: string;
  imagenes: Imagen[]; // Lista de imágenes asociadas al personaje
}
