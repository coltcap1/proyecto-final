import { Imagen } from './imagen.model';

export interface Escenario {
  id: number;
  nombre: string;
  mundo: string;
  imagenes: Imagen[];
}
