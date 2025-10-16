import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import {
  AuthRemoteRepository,
  LoginCredentials,
  LoginResult,
  RegisterCredentials,
  RegisterResult,
} from '../../domain/repositories/auth-remote.repository';
import { AuthTokenEntity } from '../../domain/entities/auth-token.entity';
import { UserEntity } from '../../domain/entities/user.entity';
import { environment } from '../../../../../environments/environment';

interface ApiLoginSuccessResponse {
  success: true;
  message: string;
  data: {
    accessToken: string;
    user: {
      id: string;
      name: string;
      lastname: string;
      email: string;
      rol: number;
      status: boolean;
    };
  };
}

interface ApiRegisterSuccessResponse {
  success: true;
  message: string;
  data: {
    id: string;
    name: string;
    lastname: string;
    email: string;
    rol: number;
    status: boolean;
    createdAt: string;
  };
}

interface ApiErrorResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  timestamp: string;
}

type ApiLoginResponse = ApiLoginSuccessResponse | ApiErrorResponse;
type ApiRegisterResponse = ApiRegisterSuccessResponse | ApiErrorResponse;

@Injectable()
export class HttpAuthRepository implements AuthRemoteRepository {
  private readonly baseUrl = environment.apiUrlAuth;

  constructor(private http: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<LoginResult> {
    const url = `${this.baseUrl}/auth/login`;
    const response = await firstValueFrom(this.http.post<ApiLoginResponse>(url, credentials));

    if (!response.success) {
      const errorMessage = Array.isArray(response.message)
        ? response.message.join(', ')
        : response.message;
      throw new Error(errorMessage || 'Error al iniciar sesión');
    }

    const token: AuthTokenEntity = { accessToken: response.data.accessToken };
    const user: UserEntity = {
      id: response.data.user.id,
      name: response.data.user.name,
      lastname: response.data.user.lastname,
      email: response.data.user.email,
      rol: response.data.user.rol,
      status: response.data.user.status,
    };

    return { token, user };
  }

  async register(credentials: RegisterCredentials): Promise<RegisterResult> {
    const url = `${this.baseUrl}/auth/register`;
    const response = await firstValueFrom(this.http.post<ApiRegisterResponse>(url, credentials));

    if (!response.success) {
      const errorMessage = Array.isArray(response.message)
        ? response.message.join(', ')
        : response.message;
      throw new Error(errorMessage || 'Error al registrar usuario');
    }

    const user: UserEntity = {
      id: response.data.id,
      name: response.data.name,
      lastname: response.data.lastname,
      email: response.data.email,
      rol: response.data.rol,
      status: response.data.status,
    };

    return { user };
  }
}
