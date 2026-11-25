export interface LoginRequest {
  correo: string;
  password: string;
}

export interface RegisterRequest {
  nombre: string;
  correo: string;
  password: string;
}

export interface AuthResponse {
  mensaje: string;
  nombre: string;
  correo: string;
}
