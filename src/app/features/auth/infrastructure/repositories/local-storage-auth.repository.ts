import { Injectable } from '@angular/core';
import { AuthLocalRepository } from '../../domain/repositories/auth-local.repository';
import { AuthTokenEntity } from '../../domain/entities/auth-token.entity';

@Injectable()
export class LocalStorageAuthRepository implements AuthLocalRepository {
  private readonly KEY = 'auth.token';

  saveToken(token: AuthTokenEntity): void {
    try {
      localStorage.setItem(this.KEY, JSON.stringify(token));
    } catch {}
  }

  getToken(): AuthTokenEntity | null {
    try {
      const raw = localStorage.getItem(this.KEY);
      return raw ? (JSON.parse(raw) as AuthTokenEntity) : null;
    } catch {
      return null;
    }
  }

  clearToken(): void {
    try {
      localStorage.removeItem(this.KEY);
    } catch {}
  }
}