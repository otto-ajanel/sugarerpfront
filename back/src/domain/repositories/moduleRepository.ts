import sugarerpClientDB from "../../infrastructure/db/postgresql/sugarerpConexion";
import {Module} from '../models/modules'
export interface IModuleRepository{
    getAllModules(): Promise<Module[]>
}
export class ModuleRepository implements IModuleRepository{
    private modules : Module[] =[]   
 async getAllModules(): Promise<Module[]> {

    const data   = await sugarerpClientDB('modules').select("*")

    return data
}
}