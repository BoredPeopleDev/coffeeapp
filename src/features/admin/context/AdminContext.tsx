
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

import {
  Cafeteria,
  cafeteriasDemo,
} from "../data/cafeteriasDemo";

interface AdminContextType {
  cafeterias: Cafeteria[];
  actualizarCafeteria: (
    id: number,
    cambios: Partial<Cafeteria>
  ) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(
  undefined
);

interface AdminProviderProps {
  children: ReactNode;
}

export function AdminProvider({ children }: AdminProviderProps) {
  const [cafeterias, setCafeterias] = useState<Cafeteria[]>(
    cafeteriasDemo
  );

  const actualizarCafeteria = (
    id: number,
    cambios: Partial<Cafeteria>
  ) => {
    setCafeterias((actuales) =>
      actuales.map((cafeteria) =>
        cafeteria.id === id
          ? { ...cafeteria, ...cambios }
          : cafeteria
      )
    );
  };

  return (
    <AdminContext.Provider
      value={{ cafeterias, actualizarCafeteria }}
    >
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);

  if (!context) {
    throw new Error(
      "useAdmin debe utilizarse dentro de AdminProvider"
    );
  }

  return context;
}
