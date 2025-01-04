<template>
    <nav class="bg-gray-800 text-white">
      <ul class="flex p-2">
        <!-- Menú Home -->
        <li class="relative group mx-2">
          <button class="flex items-center px-4 py-2 hover:bg-gray-900 hover:rounded-lg ">
            <span class="ml-2">Home</span>
            <i class="pl-2 pi pi-angle-down"></i>
          </button>
          <!-- Submenú -->
          <ul class="absolute left-0 mt-2 w-40 bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
            <li class="px-4 py-2 hover:bg-gray-900 cursor-pointer">Submenu 1</li>
            <li class="px-4 py-2 hover:bg-gray-900 cursor-pointer">Submenu 2</li>
            <li class="px-4 py-2 hover:bg-gray-900 cursor-pointer">Submenu 3</li>
          </ul>
        </li>
  
        <!-- Menú Modules -->
        <li class="relative group mx-2">
          <button class="flex items-center px-4 py-2">
              <span class="ml-2">Modules</span>
              <i class="pl-2 pi pi-angle-down group-hover:rotate-180 group-hover:pr-2 "></i>
          </button>
          <!-- Submenú -->
          <ul class="absolute left-0 mt-2 w-40 bg-gray-800 text-white rounded-md opacity-0 group-hover:opacity-100 group-hover:rounded-lg transition-opacity duration-300 ease-in-out">
            <li class="px-4 py-2 hover:bg-gray-900 cursor-pointer">Submenu 1</li>
            <li class="px-4 py-2 hover:bg-gray-900 cursor-pointer">Submenu 2</li>
            <li class="px-4 py-2 hover:bg-gray-900 cursor-pointer">Submenu 3</li>
          </ul>
        </li>
      </ul>
    </nav>
  </template>  
  <script>
  export default {
    name: 'MenuBar'
  }
  </script>
  
  <style>
  /* Puedes añadir estilos adicionales aquí si lo deseas */
  </style>
  