import { Injectable } from '@angular/core';
import {
  AuthRemoteRepository,
  RegisterCredentials,
  RegisterResult,
} from '../../domain/repositories/auth-remote.repository';

@Injectable({ providedIn: 'platform' })
export class RegisterUseCase {
  constructor(
    private readonly authRemote: AuthRemoteRepository,
  ) {}

  async execute(credentials: RegisterCredentials): Promise<RegisterResult> {
    const result = await this.authRemote.register(credentials);
    return result;
  }
}
