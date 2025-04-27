import { Imagen } from './imagen.model';

export interface Habilidad {
  id: number;
  nombre: string;
  dano: number; 
  iconoUrl: string;
  imagenes: Imagen[]; 
}
