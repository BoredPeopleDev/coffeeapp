import { useState } from "react";
import { authApi } from "../api/authApi";
import { IAuthService } from "../services/IAuthService";
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
} from "../types/auth.types";

export const useAuth = (service: IAuthService = authApi) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<AuthResponse | null>(null);

  const login = async (
    credentials: LoginRequest,
  ): Promise<AuthResponse | null> => {
    if (!credentials.correo.trim() || !credentials.password.trim()) {
      setError("Por favor ingresa tu correo y contraseña.");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await service.login(credentials);
      setUser(data);
      return data;
    } catch (err: any) {
      setError(err.message ?? "Error de conexión con el servidor");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    payload: RegisterRequest,
  ): Promise<AuthResponse | null> => {
    if (
      !payload.nombre.trim() ||
      !payload.correo.trim() ||
      !payload.password.trim()
    ) {
      setError("Todos los campos son obligatorios.");
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await service.register(payload);
      setUser(data);
      return data;
    } catch (err: any) {
      setError(err.message ?? "Error de conexión con el servidor");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { login, register, loading, error, user };
};
