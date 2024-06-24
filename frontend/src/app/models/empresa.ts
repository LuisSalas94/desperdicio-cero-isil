export interface Empresa {
  id?: number;
  nombre: string;
  direccion: string;
  horario: string;
  email: string;
  telefono: string;
  tipo: string;
  logo: string;
  productos: Producto[];
}

export interface Producto {
  id?: number;
  nombre: string;
  descripcion: string;
  codProducto?: string;
  precioOriginal: number;
  precioOferta: number;
  stock: number;
  tipoProducto: string;
  empresa: {
    id: number;
  };
}
