
export interface Usuario {
  id: string;
  nombre: string;
  correo: string;
  visitas: number;
  ultimaVisita: string;
  estado: "Activo" | "Inactivo";
}

export const usuariosDemo: Usuario[] = [
  {
    id: "1",
    nombre: "Eduardo Rodríguez",
    correo: "eduardo@email.com",
    visitas: 24,
    ultimaVisita: "12 Oct 2026",
    estado: "Activo",
  },
  {
    id: "2",
    nombre: "María López",
    correo: "maria@email.com",
    visitas: 18,
    ultimaVisita: "10 Oct 2026",
    estado: "Activo",
  },
  {
    id: "3",
    nombre: "Carlos Pérez",
    correo: "carlos@email.com",
    visitas: 12,
    ultimaVisita: "09 Oct 2026",
    estado: "Activo",
  },
  {
    id: "4",
    nombre: "Ana Torres",
    correo: "ana@email.com",
    visitas: 8,
    ultimaVisita: "08 Oct 2026",
    estado: "Activo",
  },
  {
    id: "5",
    nombre: "Luis García",
    correo: "luis@email.com",
    visitas: 5,
    ultimaVisita: "05 Oct 2026",
    estado: "Inactivo",
  },
  {
    id: "6",
    nombre: "Mariana Sánchez",
    correo: "mariana@email.com",
    visitas: 15,
    ultimaVisita: "11 Oct 2026",
    estado: "Activo",
  },
];
