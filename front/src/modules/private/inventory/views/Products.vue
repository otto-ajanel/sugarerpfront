<template>
  <div class="mt-18">
    <div class="flex justify-content-between align-items-center mb-2">
      <router-link to="/erp/products/new" class="ma-none">
        <Button icon="pi pi-plus" label="Producto nuevo" type="button" raised></Button>
      </router-link>    
    </div>
    <div class="card">
      <DataTable 
        :value="products" 
        tableStyle="min-width: 50rem" 
        removableSort 
        paginator
        :lazy="true"
        :rows="rows"
        :rowsPerPageOptions="[10]"
        :totalRecords="totalRecords"
        :first="first"
        :pageLinkSize="totalPages"
        
        @page="onPageChange"
        @sort="onSortChange"
        @filter="onFilterChange"
      >
        <Column field="product_sku" header="Product SKU" sortable></Column>
        <Column field="product_des" header="Product Description" sortable></Column>
        <Column field="Category.des" header="Categoria" sortable></Column>
        <Column field="product_costprice" header="Cost Price" sortable></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { useProduct } from "../../../../composables/modules/product/productComposable";
import { onMounted } from 'vue';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';

const {
  products,
  fetchPageData,
  totalRecords,
  first,
  rows,
  currentPage,
  onPageChange,
  onSortChange,
  onFilterChange,
  totalPages
} = useProduct();

fetchPageData(1, rows.value);
</script>