import { ENV } from "../../../config/env";
import { IAuthService } from "../services/IAuthService";
import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
} from "../types/auth.types";

export const authApi: IAuthService = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    const response = await fetch(`${ENV.API_URL}/clientes/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "Correo o contraseña incorrectos");
    }

    return response.json();
  },

  async register(data: RegisterRequest): Promise<AuthResponse> {
    const response = await fetch(`${ENV.API_URL}/clientes/registro`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || "No se pudo completar el registro");
    }

    return response.json();
  },
};
