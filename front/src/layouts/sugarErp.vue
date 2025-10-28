<template>
    <MenuSugarERP/>
    <SideBar/>
    <div class="content-main">
      <RouterView 
          v-animateonscroll="{ enterClass: 'animate-enter fade-in-10 slide-in-from-l-8 animate-duration-1000', leaveClass: 'animate-leave fade-out-0' }"
      
      class="ml-24 z-30 mt-16"/>
    </div>
</template>
<script setup lang="ts">
import MenuSugarERP from "../../src/components/SugarERP/Menu/index.vue"
import SideBar from "../components/SugarERP/Menu/SideBar.vue";


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
console.log(new Date())

//console.log(result["value"])

</script>