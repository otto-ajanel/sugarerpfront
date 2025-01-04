<script setup lang="ts">
import Menu from './components/Menu.vue';
import { Button } from 'primevue';
</script>

<template>
<Menu/>
<Button label="Secondary" severity="secondary" variant="text" raised />
<Button label="Success" severity="success" variant="text" raised />
<Button label="Info" severity="info" variant="text" raised />
<Button label="Warn" severity="warn" variant="text" raised />
<Button label="Help" severity="help" variant="text" raised />
<Button label="Danger" severity="danger" variant="text" raised />
<Button label="Contrast" severity="contrast" variant="text" raised />
<Button class="youtube p-0" aria-label="Youtube">
    <i class="pi pi-youtube px-2"></i>
    <span class="px-4">Youtube</span>
</Button>
</template>

<style scoped>
.cssps{
  background: red;
  width: 200px;
}
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
