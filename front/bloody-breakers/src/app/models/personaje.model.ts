import { Habilidad } from './habilidad.model';
import { Imagen } from './imagen.model';

export interface Personaje {
  id: number;
  nombre: string;
  esEnemigo: boolean;
  historia: string;
  iconoUrl: string;
  id_mundo: number;
  IMAGENES: Imagen[]; // Lista de imágenes asociadas al personaje
  HABILIDADES: Habilidad[];
}
