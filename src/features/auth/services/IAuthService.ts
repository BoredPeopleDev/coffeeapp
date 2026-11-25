import {
    AuthResponse,
    LoginRequest,
    RegisterRequest,
} from "../types/auth.types";

export interface IAuthService {
  login(credentials: LoginRequest): Promise<AuthResponse>;
  register(data: RegisterRequest): Promise<AuthResponse>;
}
