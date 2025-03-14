import { IAuthRepository } from '../domain/repositories/authRepository';
import { User } from '../domain/models/user';
import { x64 } from 'crypto-js';

export interface IAuthService {
  getUser(email:string, password:string): Promise<User>;
}

export class AuthService implements IAuthService {
  private authRepository: IAuthRepository;

  constructor(authRepository: IAuthRepository) {
    this.authRepository = authRepository;

  }

  async getUser(email:string, password:string): Promise<User> {
    return this.authRepository.getUser(email, password);
  }
}
