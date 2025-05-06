import { Imagen } from "./imagen.model";
import { Personaje } from "./personaje.model";

export interface Habilidad {
  id: number;
  nombre: string;
  dano: number; 
  iconoUrl: string;
  IMAGENES: Imagen[];
  PERSONAJES: Personaje[];
}
