
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import {
  Usuario,
  usuariosDemo,
} from "../data/usuariosDemo";

// HISTORIAL DE MOVIMIENTOS
export interface MovimientoUsuario {
  id: string;
  usuarioId: string;
  nombreUsuario: string;
  accion: "Activación" | "Desactivación";
  motivo: string;
  realizadoPor: string;
  sucursal: string;
  fecha: string;
}

interface UsuariosContextType {
  usuarios: Usuario[];
  movimientos: MovimientoUsuario[];

  actualizarUsuario: (
    id: string,
    cambios: Partial<Usuario>
  ) => void;

  agregarUsuario: (usuario: Usuario) => void;

  registrarCambioEstado: (
    id: string,
    nuevoEstado: "Activo" | "Inactivo",
    motivo: string,
    realizadoPor: string,
    sucursal: string
  ) => void;
}

const UsuariosContext = createContext<
  UsuariosContextType | undefined
>(undefined);

interface UsuariosProviderProps {
  children: ReactNode;
}

export function UsuariosProvider({
  children,
}: UsuariosProviderProps) {
  const [usuarios, setUsuarios] = useState<Usuario[]>(
    usuariosDemo
  );

  const [movimientos, setMovimientos] = useState<
    MovimientoUsuario[]
  >([]);

  // ACTUALIZAR INFORMACIÓN DEL USUARIO
  const actualizarUsuario = (
    id: string,
    cambios: Partial<Usuario>
  ) => {
    setUsuarios((actuales) =>
      actuales.map((usuario) =>
        usuario.id === id
          ? { ...usuario, ...cambios }
          : usuario
      )
    );
  };

  // AGREGAR USUARIO
  const agregarUsuario = (usuario: Usuario) => {
    setUsuarios((actuales) => [
      ...actuales,
      usuario,
    ]);
  };

  // REGISTRAR ACTIVACIÓN O DESACTIVACIÓN
  const registrarCambioEstado = (
    id: string,
    nuevoEstado: "Activo" | "Inactivo",
    motivo: string,
    realizadoPor: string,
    sucursal: string
  ) => {
    const usuario = usuarios.find(
      (item) => item.id === id
    );

    if (!usuario || usuario.estado === nuevoEstado) {
      return;
    }

    const accion =
      nuevoEstado === "Activo"
        ? "Activación"
        : "Desactivación";

    const movimiento: MovimientoUsuario = {
      id: `${Date.now()}-${id}`,
      usuarioId: id,
      nombreUsuario: usuario.nombre,
      accion,
      motivo,
      realizadoPor,
      sucursal,
      fecha: new Date().toISOString(),
    };

    // ACTUALIZAR ESTADO DEL CLIENTE
    actualizarUsuario(id, {
      estado: nuevoEstado,
    });

    // GUARDAR MOVIMIENTO EN EL HISTORIAL
    setMovimientos((actuales) => [
      movimiento,
      ...actuales,
    ]);
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        movimientos,
        actualizarUsuario,
        agregarUsuario,
        registrarCambioEstado,
      }}
    >
      {children}
    </UsuariosContext.Provider>
  );
}

export function useUsuarios() {
  const context = useContext(UsuariosContext);

  if (!context) {
    throw new Error(
      "useUsuarios debe utilizarse dentro de UsuariosProvider"
    );
  }

  return context;
}
