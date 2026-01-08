<template>
  <div class="mt-18">
    <div class="flex justify-content-between align-items-center mb-2">
      <router-link to="/erp/products/new" class="ma-none">
       <Button icon="pi pi-plus" label="Producto nuevo" type="button" raised>
      </Button>
    </router-link>    
    
    </div>

    <DataTable :value="products" tableStyle="min-width: 50rem" removableSort paginator :rows="10" :rowsPerPageOptions="[5,10,25,50]">
      <Column field="product_sku" header="product sku" sortable></Column>
      <Column field="product_des" header="Product Description" sortable></Column>
      <Column field="product_price" header="Price" sortable></Column>
      <Column field="product_costprice" header="Cost Price" sortable></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useProduct } from "../../../../composables/modules/product/productComposable";
import { onMounted } from 'vue';

const { products, fnGetProducts } = useProduct();
onMounted (() => {
  fnGetProducts();
});

</script>