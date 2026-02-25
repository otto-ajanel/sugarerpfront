<template>
    <div>
        <router-link to="/erp/incomes/new" class="ma-none">
            <Button label="Nuevo ingreso" />
        </router-link>
        <DataTable :value="incomes" class="mt-4">
            <Column field="ID" header="Correlativo interno"></Column>
            <Column field="IncomeDoc" header="Documento de ingreso"></Column>
            <Column field="IncomeDateIng" header="Fecha de documento"></Column>
            <Column field="StoreName" header="Tienda/Bodega"></Column>
            <Column field="Username" header="Encargado de ingreso"></Column>

        </DataTable>
    </div>
    
</template>
<script lang="ts" setup >
import useIncomeComposable from '../../../../composables/modules/income/useIncomeComposable';

const {incomes} = useIncomeComposable()

</script>
{
        "ID": 16,
        "IncomeDoc": "4897",
        "IncomeDateIng": "2026-01-05T00:00:00Z",
        "Username": "user3",
        "StoreName": "Vi plaza  chichicastenango"
    },