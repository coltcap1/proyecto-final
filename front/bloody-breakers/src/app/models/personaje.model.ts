import { Habilidad } from './habilidad.model';
import { Imagen } from './imagen.model';

export interface Personaje {
  id: number;
  nombre: string;
  esEnemigo: boolean;
  historia: string;
  iconoUrl: string;
  mundo: string;
  habilidades: Habilidad[];
  imagenes: Imagen[]; // Lista de imágenes asociadas al personaje
}
