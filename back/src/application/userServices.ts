import { IUserRepository } from '../domain/repositories/userRepository';
import { User } from '../domain/models/user';

export interface IUserService {
  getUsers(): Promise<User[]>;
  createUser(user_mail: string): Promise<User>;
}

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async getUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  async createUser(name: string): Promise<User> {
    return this.userRepository.createUser(name);
  }
}
