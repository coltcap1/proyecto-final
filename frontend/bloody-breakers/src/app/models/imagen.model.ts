export interface Imagen {
    id: number;
    url: string;
    tipoEntidad: 'MUNDO' | 'ESCENARIO' | 'PERSONAJE' | 'HABILIDAD' | 'EXTRAS';
    idEntidad: number;
    nombre: string;
    fechaSubida: string; // Podrías convertirlo a Date luego si quieres
    descripcion?: string; // Opcional
  }
  