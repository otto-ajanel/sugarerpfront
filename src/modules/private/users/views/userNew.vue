<template>
  <div class="relative top-10 w-full">
    <form @submit.prevent="saveUser" class="w-full flex flex-col content-center items-center gap-6">
      <label for="form" class=" w-full md:w-1/3 font-bold text-primary">Formulario para crear usuario</label>

      <InputGroup class="w-full md:!w-1/3">
        <InputGroupAddon>
          <i class="pi pi-at"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputText id="email" type="email" autocomplete="new-password" spellcheck="false" 
          v-model="formUser.email" />
          <label for="email">Correo electronico</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="w-full md:!w-1/3">
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputText id="name" type="text" v-model="formUser.name" />
          <label for="name">Nombre</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="w-full md:!w-1/3">
        <InputGroupAddon>
          <i class="pi pi-user"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputText id="lastname" type="text" v-model="formUser.lastName" />
          <label for="lastname">Apellido</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="w-full md:!w-1/3">
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <FloatLabel>
          <Password id="lastname" v-model="formUser.password" toggleMask/>
          <label for="lastname">Contraseña</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="w-full md:!w-1/3">
        <InputGroupAddon>
          <i class="pi pi-key"></i>
        </InputGroupAddon>
        <FloatLabel>
          <Password  id="confirmPasword" v-model="formUser.passwordConfirm" toggleMask />
          <label for="lastname">Confirmar contrseña</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="w-full md:!w-1/3">
        <InputGroupAddon>
          <i class="pi pi-phone"></i>
        </InputGroupAddon>
        <FloatLabel>
          <InputMask
            mask="9999-9999"
            placeholder="9999-9999"
            id="phone"
            type="text"
            v-model="formUser.phone"
          />
          <label for="phone">Numero de telefono</label>
        </FloatLabel>
      </InputGroup>
      <Select
        class="w-full md:!w-1/3"
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

      <Button 
      class="w-1/3"
      type="submit" label="Crear usuario" />
    </form>
    <Toast/>
  </div>
</template>
<script lang="ts" setup>
import useStoreComposable from '../../../../composables/modules/store/useStoreComposable';
import userComposable from '../../../../composables/modules/users/userComposable';
import { useToast } from 'primevue/usetoast';

const toast =useToast()
const {stores} =useStoreComposable()
const {formUser, saveUser} = userComposable(toast)
</script>
<style scoped>
</style>
