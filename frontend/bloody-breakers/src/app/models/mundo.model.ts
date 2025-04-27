import { Imagen } from './imagen.model';

export interface Mundo {
  id: number;
  nombre: string;
  historia: string;
  imagenes?: Imagen[]; // Lista de imágenes asociadas al mundo
}
