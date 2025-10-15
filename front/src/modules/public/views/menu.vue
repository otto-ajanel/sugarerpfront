<template>
    <div class="fixed top-0 w-full z-50">
        <Toolbar :model="items" pt:root=" px-4">
            <template #start>
            <img src="../../../assets/imgs/oaLogo.png" alt="logo" width="30">

            <Button label="modulos" type="button"  text icon="pi pi-th-large" />
            <Button label="Home" text />
            
            </template> 
            <template #end>
                <Button as="a" icon="pi pi-user" variant="text" rounded aria-label="Filter" label="login" href="#login"/>
                <Button as="a" icon="pi pi-github" severity="secondary" variant="text" rounded aria-label="Bookmark" href="https://github.com/otto-ajanel"/>

            </template>

        </Toolbar>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Toolbar from '@/volt/Toolbar.vue';
import Button from '@/volt/Button.vue';

 
function menuitem(){
    const homeSection = document.getElementById("home");

      // Desplázate suavemente a la sección
      if (homeSection) {
        homeSection.scrollIntoView({ behavior: "smooth" });
      }
     console.log("hello wordl")
}

const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        itemLink:"#home",
        command:menuitem
        
    },
    {
        label: 'About',
        
    }
]);
</script>
<style>

#end{
    text: red !important;
}
</style>
