export interface Imagen {
  id: number;
  tipo_entidad: 'MUNDO' | 'ESCENARIO' | 'PERSONAJE' | 'HABILIDAD' | 'EXTRAS';
  id_entidad: number;
  nombre: string;
  url: string;
  descripcion: string | null;
}
