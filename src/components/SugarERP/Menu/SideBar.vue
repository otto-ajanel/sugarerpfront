<template>
  <aside
  v-if="moduleSelected?.menus"
    :class="[
      'fixed top-16 left-0 h-screen bg-white text-primary transition-all duration-300 z-60 shadow-xl/30',
      isCollapsed ? 'w-16' : 'w-64',
      
    ]"
  >
    <div class="flex justify-end p-4 cursor-pointer" @click="toggleCollapse">
      <i :class="['pi text-lg', isCollapsed ? 'pi-arrow-circle-right' : 'pi-arrow-circle-left']"></i>
    </div>

    <nav>
      <ul class="space-y-1 p-1">
        <li v-for="menu in moduleSelected?.menus" :key="menu.id_menu" class="relative"

        >
          <div
            @mouseenter="handleMouseEnter(menu)"
            @mouseleave="handleMouseLeave"
          >
            <div
              class="flex items-center z-60 p-3 rounded-lg cursor-pointer hover:bg-primary hover:text-white dark:hover:bg-gray-700"
              :class="{ 'border-b-2 border-primary ': isMenuActive(menu) }"
              @click="toggleSubmenu(menu)"
            >

              <i :class="['pi '+menu.icon_menu , 'text-lg mr-2', isCollapsed ? 'mx-auto' : '']" @click="uiStoreState.navigatePath(menu.path_menu)"></i>
              <span v-show="!isCollapsed" class="whitespace-nowrap" @click="uiStoreState.navigatePath(menu.path_menu)">{{ menu.menu_name }}</span>
              <i
                v-if="menu.submenus.length > 0 && !isCollapsed"
                :class="['pi ml-auto', menu.expanded ? 'pi-chevron-down' : 'pi-chevron-right']"
              ></i>
            </div>

            <transition name="fade">
              <div
                v-if="isCollapsed && activeHoverMenu === menu"
                class="absolute top-0 left-16 ml-1 mt-2 bg-white text-primary  rounded-lg shadow-lg p-2 z-50 w-48"
              >
                <ul class="space-y-1">
                  <li v-for="submenu in menu.submenus" :key="submenu.id_menu">
                    <div
                      class="flex items-center p-2 rounded-lg cursor-pointer hover:bg-primary hover:text-white dark:hover:bg-gray-600"
                      :class="{ 'border-b-2 border-primay ': isMenuActive(submenu) }"
                      @click="selectMenuItem(submenu)"
                    >
                      <li :class="[ 'pi '+ submenu.icon_menu, 'mr-2']" @click="uiStoreState.navigatePath(submenu.path_menu)"></li>
                      <span @click="uiStoreState.navigatePath(submenu.path_menu)">{{ submenu.menu_name }}</span>
                    </div>
                  </li>
                </ul>
              </div>
            </transition>
          </div>

          <ul
            v-if="menu.submenus"
            v-show="menu.expanded && !isCollapsed"
            class="ml-8 mt-2 space-y-1"
          >
            <li v-for="submenu in menu.submenus" :key="submenu.id_menu">
              <div
                class="flex items-center rounded-lg p-2 cursor-pointer hover:bg-primary hover:text-white dark:hover:bg-gray-600"
                :class="{ 'border-b-2 border-primary ': isMenuActive(submenu) }"
                @click="selectMenuItem(submenu)"
              >
                <li
                @click="uiStoreState.navigatePath(submenu.path_menu)"
                :class="['pi '+submenu.icon_menu, 'mr-2']"></li>
                <span
                @click="uiStoreState.navigatePath(submenu.path_menu)"
                >{{ submenu.menu_name }}</span>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {uiStore} from '../../../stores/uiStore'
import { storeToRefs } from 'pinia';

const uiStoreState =uiStore()
const {  moduleSelected } = storeToRefs(uiStoreState)

interface MenuItem {
    id_menu: number | string;
    menu_name: string;
    path_menu: string;
    icon_menu: string;
    expanded?: boolean;
    submenus: MenuItem[];
}

const activeMenu = ref<MenuItem | null>(null);

const isCollapsed = ref(true);
const activeHoverMenu = ref(null);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  activeHoverMenu.value = null;
};

const toggleSubmenu = (menu:any) => {
  if (menu.submenus.length>0) {
    menu.expanded = !menu.expanded;
  } else {
    selectMenuItem(menu);
  }
};

const selectMenuItem = (menu:any) => {
  activeMenu.value = menu;
  // Aquí manejarías el enrutamiento con Vue Router
  // router.push(menu.route);
};

const isMenuActive = (menu:any) => {
  return activeMenu.value && activeMenu.value.id_menu == menu.id_menu;
};

const handleMouseEnter = (menu:any) => {
  if (isCollapsed.value && menu.submenus.length>0) {
    activeHoverMenu.value = menu;
  }
};

const handleMouseLeave = () => {
  activeHoverMenu.value = null;
};
</script>

<style scoped>
/* Transición para el submenú flotante */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>