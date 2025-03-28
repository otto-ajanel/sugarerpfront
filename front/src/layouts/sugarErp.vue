<template>
    <MenuSugarERP/>

    <RouterView />
</template>
<script setup lang="ts">
import { provideApolloClient, useQuery } from "@vue/apollo-composable";
import MenuSugarERP from "../../src/components/SugarERP/Menu/index.vue"
import gql from "graphql-tag";

console.log(new Date())
const {result} = useQuery(gql`
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
`);
console.log(new Date())

console.log(result["value"])

</script>