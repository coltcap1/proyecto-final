import { Imagen } from './imagen.model';
import { Mundo } from './mundo.model';

export interface Escenario {
  id: number;
  nombre: string;
  MUNDOS: Mundo;
  IMAGENES: Imagen[];
}
