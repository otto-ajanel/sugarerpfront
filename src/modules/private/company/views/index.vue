<template>
    <div class="p-4">
        <Button label="Crear" primary raised/>

        <DataTable
        :value="companies"
        header="Empresas"
        >
        <Column field="company_name" header="Nombre"></Column>
        <Column field="address" header="Dirección"></Column>    
        <Column field="phone" header="Teléfono"></Column>   
        <Column field="email" header="Email"></Column>
        

        </DataTable>
    </div>
</template>
<script setup lang="ts">   
import useCompanyComposable from '../../../../composables/modules/company/companyComposable'; 
const {companies} = useCompanyComposable();
</script>
