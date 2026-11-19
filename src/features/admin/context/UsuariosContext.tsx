
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

interface UsuariosContextType {
  usuarios: Usuario[];

  actualizarUsuario: (
    id: string,
    cambios: Partial<Usuario>
  ) => void;

  agregarUsuario: (usuario: Usuario) => void;
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

  const agregarUsuario = (usuario: Usuario) => {
    setUsuarios((actuales) => [
      ...actuales,
      usuario,
    ]);
  };

  return (
    <UsuariosContext.Provider
      value={{
        usuarios,
        actualizarUsuario,
        agregarUsuario,
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
