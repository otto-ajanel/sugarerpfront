import { IUserService } from '../../application/userService';

export const resolvers = {
  Query: {
    users: async (_, __, { userService }: { userService: IUserService }) => {
      return userService.getUsers();
    }
  },
  Mutation: {
    createUser: async (_, { name }, { userService }: { userService: IUserService }) => {
      return userService.createUser(name);
    }
  }
};
