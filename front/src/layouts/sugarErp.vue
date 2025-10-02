<template>
    <MenuSugarERP/>
    <SideBar/>
    <div class="content-main">
      <RouterView class="ml-24 z-40"/>
    </div>
</template>
<script setup lang="ts">
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import MenuSugarERP from "../../src/components/SugarERP/Menu/index.vue"
import SideBar from "../components/SugarERP/Menu/SideBar.vue";

import gql from "graphql-tag";

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