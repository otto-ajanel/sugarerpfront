<template>
  <div class="mt-18">
    <div class="flex justify-content-between align-items-center mb-2">
      <RouterLink to="/erp/products/new" class="ma-none">

        <Button icon="pi pi-plus" label="Producto nuevo" type="button" raised>
        </Button>
    </RouterLink>    
    </div>

    <DataTable :value="products" tableStyle="min-width: 50rem" removableSort paginator :rows="10" :rowsPerPageOptions="[5,10,25,50]">
      <Column field="product_sku" header="product sku" sortable></Column>
      <Column field="product_des" header="Product Description" sortable></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { ref, onMounted } from "vue";
import { useProduct } from "../../../../composables/modules/product/productComposable";

const { products, fnGetProducts } = useProduct();
onMounted(() => {
  fnGetProducts();
});
</script>