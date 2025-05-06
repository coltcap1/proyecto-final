export interface Imagen {
  id: number;
  tipoEntidad: 'MUNDO' | 'ESCENARIO' | 'PERSONAJE' | 'HABILIDAD' | 'EXTRAS';
  idEntidad: number;
  nombre: string;
  url: string;
  descripcion: string | null;
}
