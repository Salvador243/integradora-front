import { AuthTokenEntity } from '../entities/auth-token.entity';
import { UserEntity } from '../entities/user.entity';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  name: string;
  lastname: string;
  email: string;
  password: string;
}

export interface LoginResult {
  token: AuthTokenEntity;
  user: UserEntity;
}

export interface RegisterResult {
  user: UserEntity;
}

export abstract class AuthRemoteRepository {
  abstract login(credentials: LoginCredentials): Promise<LoginResult>;
  abstract register(credentials: RegisterCredentials): Promise<RegisterResult>;
}
