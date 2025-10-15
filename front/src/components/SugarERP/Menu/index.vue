
<template>
  <div
    :class="[
      'flex flex-col transition-colors duration-300',
      darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-800',
    ]"
  >
    <!-- Navbar principal -->
    <header
      :class="[
        'border-b transition-colors duration-300 fixed w-full top-0 z-40',
        darkMode
          ? 'bg-gray-800 border-gray-700 shadow-sm'
          : 'bg-white border-gray-200 shadow-sm',
      ]"
    >
      <div
        class="container mx-auto px-4 flex items-center justify-between h-15"
      >
        <!-- Logo y título -->
        <div class="flex items-center">
          <div class="flex items-center">
            <div
              class="h-9 w-9 rounded-lg flex items-center justify-center mr-3"
            >
              <img :src="logo" alt="" />
            </div>
            <span class="text-xl font-semibold">Sugar ERP</span>
          </div>
        </div>

        <!-- Controles de navegación -->
        <div class="flex items-center space-x-1">
          <!-- Búsqueda -->
          <div class="relative mr-2 hidden md:block">
            <input
              type="text"
              placeholder="Buscar..."
              :class="[
                'pl-9 pr-4 py-2 rounded-full w-56 transition-colors',
                darkMode
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-gray-100 text-gray-800 border-gray-200',
              ]"
            />
            <i class="pi pi-search absolute left-3 top-2.5 text-gray-500"></i>
          </div>

          <!-- Botón de módulos -->
          <button
            @click="uiStoreState.changeShowmodule(true)"
            :class="[
              'flex items-center justify-center h-10 px-3 rounded-lg transition-colors',
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
            ]"
            aria-label="Abrir módulos"
          >
            <i class="pi pi-th-large mr-2"></i>
            <span class="hidden md:inline">Módulos</span>
          </button>

          <!-- Notificaciones -->
          <button
            :class="[
              'relative flex items-center justify-center h-10 w-10 rounded-full transition-colors',
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
            ]"
            aria-label="Notificaciones"
          >
            <i class="pi pi-bell"></i>
            <span
              class="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-white text-xs"
              >3</span
            >
          </button>

          <!-- Tema oscuro/claro -->
          <button
            @click="toggleDarkMode"
            :class="[
              'flex items-center justify-center h-10 w-10 rounded-full transition-colors',
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
            ]"
            aria-label="Cambiar tema"
          >
            <i :class="darkMode ? 'pi pi-sun' : 'pi pi-moon'"></i>
          </button>

          <!-- Usuario -->
          <button
            :class="[
              'flex items-center justify-center h-10 rounded-full transition-colors ml-1',
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
            ]"
            aria-label="Perfil de usuario"
          >
            <img
              :src="perfil"
              alt="Avatar"
              class="h-8 w-8 rounded-full mr-0 md:mr-2"
            />
            <span class="hidden md:block">Otto Ajanel</span>
            <i class="pi pi-chevron-down ml-1 hidden md:block"></i>
          </button>
        </div>
      </div>
    </header>
  </div>
  <ModulesDialog showModule="showModule" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { uiStore } from "../../../stores/uiStore";
import ModulesDialog from "./ModulesDialog.vue";
import { storeToRefs } from "pinia";
import logo from "../../../assets/imgs/oaLogo.png";
import perfil from "../../../assets/imgs/perfilotto.jpg";

const uiStoreState = uiStore();
const { darkMode } = storeToRefs(uiStoreState);


import Toolbar from "../../../volt/Toolbar.vue";
import Button from "../../../volt/Button.vue";
import ModuleDialog from "../moduleDialog.vue";

const items = ref([
  {
    label: "Furniture",
    icon: "pi pi-box",
    items: [
      [
        {
          label: "Living Room",
          items: [
            { label: "Accessories" },
            { label: "Armchair" },
            { label: "Coffee Table" },
            { label: "Couch" },
            { label: "TV Stand" },
          ],
        },
      ],
      [
        {
          label: "Kitchen",
          items: [
            { label: "Bar stool" },
            { label: "Chair" },
            { label: "Table" },
          ],
        },
        {
          label: "Bathroom",
          items: [{ label: "Accessories" }],
        },
      ],
      [
        {
          label: "Bedroom",
          items: [
            { label: "Bed" },
            { label: "Chaise lounge" },
            { label: "Cupboard" },
            { label: "Dresser" },
            { label: "Wardrobe" },
          ],
        },
      ],
      [
        {
          label: "Office",
          items: [
            { label: "Bookcase" },
            { label: "Cabinet" },
            { label: "Chair" },
            { label: "Desk" },
            { label: "Executive Chair" },
          ],
        },
      ],
    ],
  },
  {
    label: "Electronics",
    icon: "pi pi-mobile",
    items: [
      [
        {
          label: "Computer",
          items: [
            { label: "Monitor" },
            { label: "Mouse" },
            { label: "Notebook" },
            { label: "Keyboard" },
            { label: "Printer" },
            { label: "Storage" },
          ],
        },
      ],
      [
        {
          label: "Home Theater",
          items: [
            { label: "Projector" },
            { label: "Speakers" },
            { label: "TVs" },
          ],
        },
      ],
      [
        {
          label: "Gaming",
          items: [
            { label: "Accessories" },
            { label: "Console" },
            { label: "PC" },
            { label: "Video Games" },
          ],
        },
      ],
      [
        {
          label: "Appliances",
          items: [
            { label: "Coffee Machine" },
            { label: "Fridge" },
            { label: "Oven" },
            { label: "Vaccum Cleaner" },
            { label: "Washing Machine" },
          ],
        },
      ],
    ],
  },
  {
    label: "Sports",
    icon: "pi pi-clock",
    items: [
      [
        {
          label: "Football",
          items: [
            { label: "Kits" },
            { label: "Shoes" },
            { label: "Shorts" },
            { label: "Training" },
          ],
        },
      ],
      [
        {
          label: "Running",
          items: [
            { label: "Accessories" },
            { label: "Shoes" },
            { label: "T-Shirts" },
            { label: "Shorts" },
          ],
        },
      ],
      [
        {
          label: "Swimming",
          items: [
            { label: "Kickboard" },
            { label: "Nose Clip" },
            { label: "Swimsuits" },
            { label: "Paddles" },
          ],
        },
      ],
      [
        {
          label: "Tennis",
          items: [
            { label: "Balls" },
            { label: "Rackets" },
            { label: "Shoes" },
            { label: "Training" },
          ],
        },
      ],
    ],
  },
]);
</script>
