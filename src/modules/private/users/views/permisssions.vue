
<template>
    <div class="card">
        <RouterLink to="/erp/user-new">
            <Button label="Nuevo usuario" severity="primary"/>
        </RouterLink>
        <DataTable 
        lazy
        paginator
            :rows="10"

        :totalRecords="users.total"
            @page="onPageChange"
            :rowsPerPageOptions="[5, 10, 20, 50]"

        :value="users.users" :frozenValue="lockedCustomers" scrollable scrollHeight="600px" tableStyle="min-width: 50rem">
            <Column field="email" header="E mail"></Column>
            <Column field="username" header="User"></Column>
            <Column header="Status">
            <template #body="{data}">
                {{  data.active ? 'Activo':'Desactivado' }}
            </template>
            
            </Column>
            <Column style="flex: 0 0 4rem;" class="flex gap-2" header="Acciones">
                <template #body="{ data, frozenRow, index }" >
                    <Button  :disable="frozenRow ? null : lockedCustomers.length >= 2" @click="toggleLock(data, frozenRow, index) " class="disabled:opacity-50">
                        <i :class="frozenRow ? 'pi pi-lock-open' : 'pi pi-lock'" />
                    </Button>
                    <Button severity="danger" type="button" :disable="frozenRow ? null : lockedCustomers.length >= 2" @click="toggleLock(data, frozenRow, index) " class="disabled:opacity-50">
                        <i :class="frozenRow ? 'pi pi-trash' : 'pi pi-trash'" />
                    </Button>
                    <Button severity="secondary" >
                        <i :class="frozenRow ? 'pi pi-pencil' : 'pi pi-pencil'" />
                    </Button>
                </template>
            </Column>
        </DataTable>
        
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import permisionsState from '../../../../composables/modules/users/permisionsComposable';
import { RouterLink } from 'vue-router';

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

onMounted(async() => {
    await getUsers(1);
});

// Manejar cambio de página
const onPageChange =async (event:any) => {
    lazyParams.value = {
        ...lazyParams.value,
        first: event.first,
        rows: event.rows,
        page: event.page + 1
    };
    await getUsers(lazyParams.value.page)
    
    
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

</script>
<style scoped>
.card{
    top:15px;
}
</style>