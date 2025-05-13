export interface UsuarioActual {
  id: number;
  email: string;
  rol: {
    id: number;
    rol: string;
  };
}
