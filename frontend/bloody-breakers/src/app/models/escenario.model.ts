import { Imagen } from './imagen.model';

export interface Escenario {
  id: number;
  nombre: string;
  idMundo: number;
  imagenes?: Imagen[];
}
