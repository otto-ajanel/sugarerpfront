import { User } from '../models/user';

export interface IUserRepository {
  getAllUsers(): Promise<User[]>;
  createUser(name: string): Promise<User>;
}

export class UserRepository implements IUserRepository {
  private users: User[] = [];

  async getAllUsers(): Promise<User[]> {
    return this.users;
  }

  async createUser(name: string): Promise<User> {
    const user = new User((this.users.length + 1).toString(), name);
    this.users.push(user);
    return user;
  }
}
