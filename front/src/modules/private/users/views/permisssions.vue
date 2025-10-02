
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
                    <button type="button" :disabled="frozenRow ? null : lockedCustomers.length >= 2" @click="toggleLock(data, frozenRow, index)" class="disabled:opacity-50 enabled:cursor-pointer">
                        <i :class="frozenRow ? 'pi pi-lock-open' : 'pi pi-lock'" />
                    </button>
                </template>
            </Column>
        </DataTable>
        
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Button from '@/volt/Button.vue';
import DataTable from '@/volt/DataTable.vue';
import SecondaryButton from '@/volt/SecondaryButton.vue';
import Paginator from '@/volt/Paginator.vue';
import Select from '@/volt/Select.vue';
import AngleLeftIcon from '@primevue/icons/angleleft';
import AngleRightIcon from '@primevue/icons/angleright';
import Column from 'primevue/column';
import permisionsState from '../../../../composables/modules/users/permisionsComposable';

const { getUsers, users } =  permisionsState()
 getUsers(1)

const lazyParams = ref({
    first: 10,
    rows: users.per_page || 10,
    page: users.current_page || 1,
    sortField: null,
    sortOrder: null
});

// Manejar cambio de página
const onPageChange = (event) => {
    lazyParams.value = {
        ...lazyParams.value,
        first: event.first,
        rows: event.rows,
        page: event.page
    };
    
    //loadData();
};

// Manejar ordenamiento (opcional)
const onSortChange = (event) => {
    lazyParams.value = {
        ...lazyParams.value,
        sortField: event.sortField,
        sortOrder: event.sortOrder
    };
  //  loadData();
};

watch(()=>lazyParams.value.page,async(newvalue, oldvalue)=>{
    await getUsers(newvalue+1)
})




const customers = ref(null);
const lockedCustomers = ref([
   /*  {
        id: 5135,
        name: 'Geraldine Bisset',
        country: {
            name: 'France',
            code: 'fr'
        },
        company: 'Bisset Group',
        status: 'proposal',
        date: '2019-05-05',
        activity: 0,
        representative: {
            name: 'Amy Elsner',
            image: 'amyelsner.png'
        }
    } */
]);
const toggleLock = (data, frozen, index) => {
    if (frozen) {
        lockedCustomers.value = lockedCustomers.value.filter((c, i) => i !== index);
        customers.value.push(data);
    } else {
        customers.value = customers.value.filter((c, i) => i !== index);
        lockedCustomers.value.push(data);
    }

    customers.value.sort((val1, val2) => {
        return val1.id < val2.id ? -1 : 1;
    });
};

onMounted(() => {
  //  CustomerService.getCustomersMedium().then((data) => (customers.value = data));
});
</script>
