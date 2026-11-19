
export interface Cafeteria {
  id: number;
  nombre: string;
  sucursal: string;
  direccion: string;
  estado: "Activa" | "Inactiva";
  visitas: number;
  clientes: number;
  horario: string;
}

export const cafeteriasDemo: Cafeteria[] = [
  {
    id: 1,
    nombre: "Cafiver",
    sucursal: "Sucursal principal",
    direccion: "Dirección pendiente",
    estado: "Activa",
    visitas: 1250,
    clientes: 320,
    horario: "Lunes a sábado · 8:00 a 20:00",
  },
  {
    id: 2,
    nombre: "Cafiver",
    sucursal: "Segunda sucursal",
    direccion: "Dirección pendiente",
    estado: "Activa",
    visitas: 890,
    clientes: 245,
    horario: "Lunes a sábado · 8:00 a 20:00",
  },
];
