

export type Producto = {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  imagen: string;
  disponible: boolean;
};

export const productos: Producto[] = [
  {
    id: 1,
    nombre: 'Café americano',
    descripcion: 'Café preparado con espresso y agua caliente.',
    precio: 35,
    categoria: 'Cafés',
    imagen: '',
    disponible: true,
  },
  {
    id: 2,
    nombre: 'Capuchino',
    descripcion: 'Espresso con leche vaporizada y espuma.',
    precio: 45,
    categoria: 'Cafés',
    imagen: '',
    disponible: true,
  },
  {
    id: 3,
    nombre: 'Latte',
    descripcion: 'Espresso combinado con leche cremosa.',
    precio: 48,
    categoria: 'Cafés',
    imagen: '',
    disponible: true,
  },
  {
    id: 4,
    nombre: 'Frappe de chocolate',
    descripcion: 'Bebida fría con sabor a chocolate.',
    precio: 60,
    categoria: 'Frappes',
    imagen: '',
    disponible: true,
  },
  {
    id: 5,
    nombre: 'Frappe de vainilla',
    descripcion: 'Bebida fría con un toque de vainilla.',
    precio: 60,
    categoria: 'Frappes',
    imagen: '',
    disponible: true,
  },
  {
    id: 6,
    nombre: 'Té helado',
    descripcion: 'Bebida refrescante servida fría.',
    precio: 40,
    categoria: 'Bebidas frías',
    imagen: '',
    disponible: true,
  },
{
  id: 7,
  nombre: 'Café molido tradicional',
  descripcion: 'Café tostado y molido.',
  precio: 120,
  categoria: 'Café envasado',
  imagen: '',
  disponible: true,
},
{
  id: 8,
  nombre: 'Café en grano',
  descripcion: 'Café tostado en grano.',
  precio: 150,
  categoria: 'Café envasado',
  imagen: '',
  disponible: true,
},

];
