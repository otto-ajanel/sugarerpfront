<template>
    <div class="fixed w-full z-50">
        <MegaMenu :model="items">
            <template #start>
                <img src="../../../assets/imgs/oaLogo.png" alt="logo" width="40">

            </template>
            
            <template #end>
                <Button as="a" icon="pi pi-user" variant="text" rounded aria-label="Filter" label="login" href="#login"/>
                <Button as="a" icon="pi pi-github" severity="secondary" variant="text" rounded aria-label="Bookmark" href="https://github.com/otto-ajanel"/>

            </template>

        </MegaMenu>
    </div>
</template>

<script setup>
import { ref } from "vue";

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
