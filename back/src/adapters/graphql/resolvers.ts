import { IUserService } from '../../application/userServices';  // Asegúrate de importar el servicio correctamente

// Resolver de GraphQL con tipos explicitos
const resolvers = {
  Query: {
    users: async (
      _: unknown,  // Aquí tipamos _ como `unknown` si no se usa
      __: unknown,  // Igualmente, si no usas el segundo parámetro, lo tipamos como `unknown`
      { userService }: { userService: IUserService }  // Desestructuramos el servicio con el tipo correspondiente
    ) => {
      const users = await userService.getUsers();
      return users;
    },
  },
  
  Mutation: {
    createUser: async (
      _: unknown,  // Al igual que en el caso anterior, si no usas el parámetro, lo podemos tipar como `unknown`
      { name }: { name: string },  // Aquí desestructuramos `name` y le damos el tipo `string`
      { userService }: { userService: IUserService }
    ) => {
      const user = await userService.createUser(name);
      return user;
    },
  },
};

export default resolvers;
