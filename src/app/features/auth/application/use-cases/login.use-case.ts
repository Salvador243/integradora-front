import { Injectable } from '@angular/core';
import {
  AuthRemoteRepository,
  LoginCredentials,
  LoginResult,
} from '../../domain/repositories/auth-remote.repository';
import { AuthLocalRepository } from '../../domain/repositories/auth-local.repository';

@Injectable({ providedIn: 'platform' })
export class LoginUseCase {
  constructor(
    private readonly authRemote: AuthRemoteRepository,
    private readonly authLocal: AuthLocalRepository,
  ) {}

  async execute(credentials: LoginCredentials): Promise<LoginResult> {
    const result = await this.authRemote.login(credentials);
    this.authLocal.saveToken(result.token);
    return result;
  }
}