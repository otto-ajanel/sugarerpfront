import { IUserRepository } from '../../domain/repositories/userRepository';  
import { UserRepository } from '../../domain/repositories/userRepository';  // Asegúrate de tener esta importación
import { UserService } from '../../application/userServices';  // Asegúrate de que UserService esté correctamente importado
import { IModuleRepository, ModuleRepository } from '../../domain/repositories/moduleRepository';
import { ModuleService } from '../../application/moduleServices';


const userRepository: IUserRepository = new UserRepository();
const userService: UserService = new UserService(userRepository);

const moduleRepository: IModuleRepository = new ModuleRepository()
const moduleService: ModuleService = new ModuleService(moduleRepository)

const resolvers = {
  Query: {
    users: async (
      _: unknown,  
      __: unknown,  
    ) => {
      
      const data = await userService.getUsers();
      return data;
    },
    modules: async()=>{
      const data =await  moduleService.getModules()
      return data
    }
  },
  
/*   Mutation: {
    createUser: async (
      _: unknown,  
      { name }: { name: string },  
      { userService }: { userService: IUserService }
    ) => {
      const user = await userService.createUser(name);
      return user;
    },
  }, */
};

export default resolvers;
