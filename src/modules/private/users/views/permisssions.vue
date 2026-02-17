
<template>
    <div class="card">
        <DataTable 
        lazy
        paginator
            :rows="10"

        :totalRecords="users.total"
            @page="onPageChange"
            :rowsPerPageOptions="[5, 10, 20, 50]"

        :value="users.data" :frozenValue="lockedCustomers" scrollable scrollHeight="600px" tableStyle="min-width: 50rem">
            <Column field="email" header="E mail"></Column>
            <Column field="username" header="User"></Column>
            <Column header="Status">
            <template #body="{data}">
                {{  data.active ? 'Activo':'Desactivado' }}
            </template>
            </Column>
            <Column style="flex: 0 0 4rem">
                <template #body="{ data, frozenRow, index }">
                    <Button type="button" :disable="frozenRow ? null : lockedCustomers.length >= 2" @click="toggleLock(data, frozenRow, index) " class="disabled:opacity-50">
                        <i :class="frozenRow ? 'pi pi-lock-open' : 'pi pi-lock'" />
                    </Button>
                </template>
            </Column>
        </DataTable>
        
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import permisionsState from '../../../../composables/modules/users/permisionsComposable';

const { getUsers, users } =  permisionsState()
const lazyParams = ref({
    first: 10,
    rows: 10,
    page: 1,    
    sortField: null,
    sortOrder: null
});

// Actualizar cuando se carguen los usuarios
watch(users, (newUsers:any) => {
    if (newUsers) {
        lazyParams.value.rows = newUsers.per_page;
        lazyParams.value.page = newUsers.current_page;
    }
});

onMounted(() => {
    getUsers(1);
});

// Manejar cambio de página
const onPageChange = (event:any) => {
    lazyParams.value = {
        ...lazyParams.value,
        first: event.first,
        rows: event.rows,
        page: event.page
    };
    
    //loadData();
};

// Manejar ordenamiento (opcional)
/* const onSortChange = (event:any) => {
    lazyParams.value = {
        ...lazyParams.value,
        sortField: event.sortField,
        sortOrder: event.sortOrder
    };
  //  loadData();
}; */

watch(()=>lazyParams.value.page,async(newvalue)=>{
    await getUsers(newvalue+1)
})




const customers = ref<any[]>([]);
const lockedCustomers = ref<any[]>([]);
const toggleLock = (data:any, frozen:boolean, index:number) => {
    if (frozen) {
        lockedCustomers.value = lockedCustomers.value.filter((_, i) => i !== index);

        customers.value.push(data);
    } else {
        customers.value = customers.value.filter((_, i:any) => i !== index);
        lockedCustomers.value.push(data);
    }

    customers.value.sort((val1:any, val2:any) => {
        return val1.id < val2.id ? -1 : 1;
    });
}; 
onMounted(() => {
  //  CustomerService.getCustomersMedium().then((data) => (customers.value = data));
});
</script>
