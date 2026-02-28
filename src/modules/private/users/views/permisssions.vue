
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
            <Column field="name" header="Nombre"></Column>
            <Column field="lastname" header="Apellido"></Column>
            <Column header="Status">
            <template #body="{data}">
                {{  data.active ? 'Activo':'Desactivado' }}
            </template>
            
            </Column>
            <Column style="flex: 0 0 4rem;" class="flex gap-2" header="Acciones">
                <template #body="{ data, frozenRow, index }" >
                    
                    <Button :severity="data.active ? 'danger':''" type="button" @click="showModal(data)" >
                        <i :class="data.active ? 'pi pi-trash' : 'pi pi-check'" />
                    </Button>
                    <Button severity="secondary" @click="toEdit(data)">
                        <i :class="frozenRow ? 'pi pi-pencil' : 'pi pi-pencil'" />
                    </Button>
                </template>
            </Column>
        </DataTable>
            <Toast position="bottom-center" group="bc" @close="onClose">
    <template #message="slotProps">
        <div class="flex flex-col items-start flex-auto">
            <div class="flex items-center gap-2">
                <span class="font-bold">{{ slotProps.message.detail.email }}</span>
            </div>
            <div class="font-medium text-lg my-4">{{ slotProps.message.summary }}</div>
            <Button size="small" label="Confirmar" severity="success" @click="onReply(slotProps.message.detail)"></Button>
        </div>
    </template>
</Toast>
<Drawer v-model:visible="visibleRight" header="Editar usuario" position="right" class="!w-120">

     <form @submit.prevent="toUpdateUser" class="w-full flex flex-col content-center items-center gap-6">
      <label for="form" class=" w-full  font-bold text-primary">Formulario para actualizar usuario</label>

      <InputGroup class="w-full ">
        <InputGroupAddon>
          <i class="pi pi-at"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputText id="email" type="email" autocomplete="new-password" spellcheck="false"  disabled..
          v-model="formUser.email" />
          <label for="email">Correo electronico</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="w-full ">
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputText id="name" type="text" v-model="formUser.name" />
          <label for="name">Nombre</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="w-full  ">
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputText id="lastname" type="text" v-model="formUser.lastName" />
          <label for="lastname">Apellido</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="w-full  ">
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <FloatLabel>
          <Password id="lastname" v-model="formUser.password" toggleMask/>
          <label for="lastname">Contraseña</label>
        </FloatLabel>
      </InputGroup>
      
      
      <Select
        class="w-full  "
        v-model="formUser.store"
        :options="stores"
        filter
        optionLabel="name"
        placeholder="Selecciona la tienda/bodega por defecto"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex items-center">
            <img
              :alt="slotProps.value.label"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`mr-2 flag flag-${slotProps.value.code.toString().toLowerCase()}`"
              style="width: 18px"
            />
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center">
            <img
              :alt="slotProps.option.label"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`mr-2 flag flag-${slotProps.option.code.toString().toLowerCase()}`"
              style="width: 18px"
            />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Select>
      <Select
        class="w-full  "
        v-model="formUser.typeUser"
        :options="[{code:24, name:'Auditor'}
        ,{code:4, name:'Administrador'}
        ,{code:26, name:'Vendedor'}
        ,{code:5 , name:'Gerente'}
        ]"
        filter
        optionLabel="name"
        placeholder="Selecciona el tipo de usuario"
      >
        <template #value="slotProps">
          <div v-if="slotProps.value" class="flex items-center">
            <img
              :alt="slotProps.value.label"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`mr-2 flag flag-${slotProps.value.code.toString().toLowerCase()}`"
              style="width: 18px"
            />
            <div>{{ slotProps.value.name }}</div>
          </div>
          <span v-else>
            {{ slotProps.placeholder }}
          </span>
        </template>
        <template #option="slotProps">
          <div class="flex items-center">
            <img
              :alt="slotProps.option.label"
              src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
              :class="`mr-2 flag flag-${slotProps.option.code.toString().toLowerCase()}`"
              style="width: 18px"
            />
            <div>{{ slotProps.option.name }}</div>
          </div>
        </template>
      </Select>

      <Button 
      class=""
      type="submit" label="Guardar cambios" />
    </form>
</Drawer>
    </div>

</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import permisionsState from '../../../../composables/modules/users/permisionsComposable';
import userComposable from '../../../../composables/modules/users/userComposable';
import useStoreComposable from '../../../../composables/modules/store/useStoreComposable';
import { RouterLink } from 'vue-router';
import { useToast } from 'primevue/usetoast';


const toast =useToast()
const {changeStateUser, formUser, updateUser, setFormToUpdate} =userComposable(toast)
const {stores} = useStoreComposable()
const { getUsers, users } =  permisionsState()
const visibleRight =ref(false)
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
 function toEdit(Userinfo:any) {
    setFormToUpdate(Userinfo)
    visibleRight.value=true
}
async function toUpdateUser(){
    await updateUser()
    visibleRight.value =false
}





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

const visibleToast = ref(false)
const showModal = (info:any)=>{
    toast.add({ severity: info.active ?'error':'success', summary: info.active ? 'Confirma en desactivar ?':'Confirma en activar', 
    group: 'bc',
    detail: info
 });
   
    visibleToast.value = true;
}
const onReply=async(infoUser:any) => {
    await changeStateUser(infoUser)
    toast.removeGroup('bc');
    visibleToast.value = false;
    await getUsers(lazyParams.value.page)
}
const onClose=()=>{
    visibleToast.value=false
}
</script>
<style scoped>
.card{
    top:15px;
}
</style>