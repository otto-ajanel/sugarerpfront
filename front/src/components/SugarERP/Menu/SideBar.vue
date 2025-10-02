<template>
  <aside
    :class="[
      'fixed top-15 left-0 h-screen bg-white text-primary transition-all duration-300 z-60 shadow-xl/30',
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
              :class="{ 'border-b-2 border-primary dark:bg-primary': isMenuActive(menu) }"
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
                class="absolute top-0 left-16 ml-1 mt-2 bg-white text-primary dark:bg-gray-700 rounded-lg shadow-lg p-2 z-50 w-48"
              >
                <ul class="space-y-1">
                  <li v-for="submenu in menu.submenus" :key="submenu.id_menu">
                    <div
                      class="flex items-center p-1 rounded-lg cursor-pointer hover:bg-primary hover:text-white dark:hover:bg-gray-600"
                      :class="{ 'border-b-2 border-primary dark:bg-blue-500': isMenuActive(submenu) }"
                      @click="selectMenuItem(submenu)"
                    >
                      <i :class="[ 'pi '+ submenu.icon_menu, 'mr-2']" @click="uiStoreState.navigatePath(submenu.path_menu)"></i>
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
                class="flex items-center p-2 rounded-lg cursor-pointer hover:bg-primary hover:text-white hover:bg-gray-600 dark:hover:bg-gray-600"
                :class="{ 'border-b-2 border-primary dark:bg-blue-500': isMenuActive(submenu) }"
                @click="selectMenuItem(submenu)"
              >
                <i 
                @click="uiStoreState.navigatePath(submenu.path_menu)"
                :class="['pi '+submenu.icon_menu, 'mr-2']"></i>
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
const { darkMode, moduleSelected } = storeToRefs(uiStoreState)

console.log(darkMode,moduleSelected)


const isCollapsed = ref(true);
const activeMenu = ref(null);
const activeHoverMenu = ref(null);

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
  activeHoverMenu.value = null;
};

const toggleSubmenu = (menu) => {
  if (menu.submenus.length>0) {
    menu.expanded = !menu.expanded;
  } else {
    selectMenuItem(menu);
  }
};

const selectMenuItem = (menu) => {
  activeMenu.value = menu;
  // Aquí manejarías el enrutamiento con Vue Router
  // router.push(menu.route);
};

const isMenuActive = (menu) => {
  return activeMenu.value && activeMenu.value.id_menu === menu.id_menu;
};

const handleMouseEnter = (menu) => {
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