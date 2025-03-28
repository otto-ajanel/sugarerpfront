import { IModuleRepository, ModuleRepository } from "../domain/repositories/moduleRepository";
import {Module} from "../domain/models/modules"
export interface IModuleService{
    getModules(): Promise<Module[]>
}
export class ModuleService implements IModuleService{
    private moduleRepository: IModuleRepository
    
    constructor(moduleRepository: IModuleRepository){
        this.moduleRepository = moduleRepository
    }
    getModules(): Promise<Module[]> {
        return this.moduleRepository.getAllModules()
    }

}