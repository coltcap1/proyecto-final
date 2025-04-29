export interface Imagen {
    id: number;
    url: string;
    tipoEntidad: 'MUNDO' | 'ESCENARIO' | 'PERSONAJE' | 'HABILIDAD' | 'EXTRAS';
    nombreEntidad: string;
    nombre: string;
    fechaSubida: string;
    descripcion: string;
  }
  