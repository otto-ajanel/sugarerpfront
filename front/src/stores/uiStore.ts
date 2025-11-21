import { defineStore } from "pinia";
import { ref } from "vue"
import { useApi } from '../composables/core/useApi'
import { useRouter } from "vue-router";


export const uiStore = defineStore('uiStore', () => {
    const navigateRouter = useRouter()
    const { getData } = useApi()
    const darkMode = ref(false)
    const showModule = ref(false)
    const modules = ref()
    const moduleSelected = ref()
    const showModalCategory = ref(false)

    async function getModulesAndMenus() {
        const { data } = await getData('permissionsbyuser',{})
        
        const originalData = data;
        const cleanedModules = transformModules(originalData);
        modules.value = organizeMenus(cleanedModules);

    }
    function changeShowmodule(value: boolean) {
        showModule.value = value
    }

    function transformModules(data: any[]): any[] {

        const moduleMap = new Map();

        data.forEach(item => {
            if (!moduleMap.has(item.id_module)) {
                moduleMap.set(item.id_module, {
                    id_module: item.id_module,
                    module_name: item.module_name,
                    description: item.description,
                    icon_module: item.icon_module,
                    menus: []
                });
            }

            const menuItem = {
                id_menu: item.id_menu,
                menu_name: item.menu_name,
                path_menu: item.path_menu,
                active: item.active,
                icon_menu: item.icon_menu,
                description_menu: item.description_menu,
                id_menu_top: item.id_menu_top,
                id_permission: item.id_permission,
                id_user: item.id_user
            };
            //console.log('Menu Item:', menuItem);    
            
            moduleMap.get(item.id_module).menus.push(menuItem);
        });

        return Array.from(moduleMap.values());
    }

    function organizeMenus(modules: any[]): any[] {
        return modules.map(module => {
            const menuMap = new Map();
            const rootMenus:any[] = [];

            module.menus.forEach((menu:any) => {
                menuMap.set(menu.id_menu, { ...menu, submenus: [] });
            });

            module.menus.forEach((menu:any) => {
                const currentMenu = menuMap.get(menu.id_menu);

                if (menu.id_menu_top === 0 || !menuMap.has(menu.id_menu_top)) {
                    rootMenus.push(currentMenu);
                } else {
                    const parentMenu = menuMap.get(menu.id_menu_top);
                    if (parentMenu) {
                        parentMenu.submenus.push(currentMenu);
                    }
                }
            });

            return {
                ...module,
                menus: rootMenus
            };
        });
    }

    function changeMode(value: boolean) {
        darkMode.value = value
    }

    function filterMenu(id_module: number) {
        showModule.value = false
        moduleSelected.value = modules.value.find((mod: any) => mod.id_module == id_module)

    }
    function navigatePath(path: String) {
        console.log(path)
        navigateRouter.push(path as any)    
    }

    function fnShowModalCategory(value: boolean) {
        showModalCategory.value = value
    }

    return {
        darkMode,
        changeMode,
        modules,
        getModulesAndMenus,
        changeShowmodule,
        showModule,
        filterMenu,
        moduleSelected,
        navigatePath,
        showModalCategory,
        fnShowModalCategory
    }
})