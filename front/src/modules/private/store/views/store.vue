<template>
  <div class="p-4">
    <div class="bg-white shadow rounded-lg p-6">
      <Button label="Crear"/>
    </div>
    <DataTable :value="stores">
      <Column field="store_id" header="ID"></Column>
      <Column field="store_name" header="Nombre de la tienda"></Column>
      <Column field="address" header="Direccion"></Column>
      <Column field="phone" header="Telefono"></Column>
    </DataTable>
  </div>
</template>
<script setup lang="ts">
import useStoreComposable from "../../../../composables/modules/store/useStoreComposable";
const { stores } = useStoreComposable();
</script>