import { Imagen } from '../imagen.model';

export function adaptImagen(data: Partial<Imagen>): Imagen {
  return {
    id: data.id ?? 0,
    url: data.url ?? '',
    tipoEntidad: data.tipoEntidad ?? 'EXTRAS',
    nombreEntidad: data.nombreEntidad ?? '',
    nombre: data.nombre ?? '',
    fechaSubida: data.fechaSubida ?? new Date().toISOString(),
    descripcion: data.descripcion ?? ''
  };
}
