import { IAuthRepository } from '../domain/repositories/authRepository';
import { User } from '../domain/models/user';
import { x64 } from 'crypto-js';

export interface IAuthService {
  getUser(): Promise<User>;
}

export class AuthService implements IAuthService {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;

  }

  async getUser(): Promise<User> {
    return this.authRepository.getUser();
  }

}
