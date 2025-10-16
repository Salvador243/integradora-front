import { Provider } from '@angular/core';
import { AuthRemoteRepository } from '../../domain/repositories/auth-remote.repository';
import { AuthLocalRepository } from '../../domain/repositories/auth-local.repository';
import { HttpAuthRepository } from '../repositories/http-auth.repository';
import { LocalStorageAuthRepository } from '../repositories/local-storage-auth.repository';

export const infrastructureProviders: Provider[] = [
  { provide: AuthRemoteRepository, useClass: HttpAuthRepository },
  { provide: AuthLocalRepository, useClass: LocalStorageAuthRepository },
];
