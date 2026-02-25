<template>
    <MenuSugarERP/>
    <SideBar/>
    <div class="content-main">
      <RouterView
      class="md:ml-24 z-20 md:mt-16 mt-16 "/>
    </div>
</template>
<script setup lang="ts">
import { defineAsyncComponent } from "vue";

const MenuSugarERP =defineAsyncComponent(()=>import('../../src/components/SugarERP/Menu/index.vue'))
const SideBar = defineAsyncComponent(()=>import('../../src/components/SugarERP/Menu/SideBar.vue'))

import { uiStore } from "../stores/uiStore";
const {getModulesAndMenus} = uiStore()

getModulesAndMenus()
console.log(new Date())
/* const {result} = useQuery(gql`
query Users {
  users {
    email
    id_usertype
    id_user
  }
  modules {
    module_name
    id_module
    description
  }
}
`);  */

//console.log(result["value"])

</script>
<style>

.content-main {
  background: var(--color-gray-50);
  padding-bottom:0rem;
  padding-top: 0rem;
  padding-left: 2rem;
  padding-right: 2rem;
  transition: background-color 0.3s ease;
}
</style>