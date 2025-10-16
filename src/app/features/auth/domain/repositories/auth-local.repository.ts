import { AuthTokenEntity } from '../entities/auth-token.entity';

export abstract class AuthLocalRepository {
  abstract saveToken(token: AuthTokenEntity): void;
  abstract getToken(): AuthTokenEntity | null;
  abstract clearToken(): void;
}