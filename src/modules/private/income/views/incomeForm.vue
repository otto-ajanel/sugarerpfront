<template>
  <div>
    <Form @submit="sendIncomeFn" class="w-full flex flex-col gap-3">
      <section class=" w-full flex gap-3">
        <FormField label="Income Title" class="w-1/2">
          <Select
            v-model="formIncome.store"
            :options="stores"
            filter
            optionLabel="name"
            placeholder="Selecciona la bodega"
            class="w-full "
            showClear 
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
        </FormField>
        <FormField label="Income Title" class="w-1/2">
          <Select
            v-model="formIncome.supplier"
            :options="suppliers"
            filter
            optionLabel="name"
            placeholder="Selecciona el proveedor"
            class="w-full "
            showClear
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
        </FormField>
      </section>
      <section class="w-full flex gap-3">

      <FormField label="Amount" class="w-1/2">
        <label for="">factura/poliza</label>
        <InputText v-model="formIncome.document" class="w-full" />
      </FormField>
      <FormField label="Date" class="w-1/2">
        <label for="">Fecha de ingreso</label>
        <DatePicker
        class="w-full"
          v-model="formIncome.dateing"
          showIcon
          fluid
          iconDisplay="input"
            dateFormat="dd/mm/yy"
            placeholder="dd/mm/yyyy"
        />
    </FormField>
</section>
<FormField label="Description" class="w-1/2">
  <InputTextarea v-model="formIncome.description" rows="4" cols="30" />
</FormField>

      <div>
        <AttributeForm
          ref="childRef"
          title="Líneas de ingreso"
          :fields="invoiceFields"
          :show-totals="false"
          @change="onInvoiceLinesChange"
          @item-added="onItemAdded"
          @item-removed="onItemRemoved"
          @item-changed="onItemChanged"
        />
      </div>
      <Button label="Guardar" type="submit" class="w-1/6" primary />
    </Form>
    <Toast/>
  </div>
</template>
<script setup lang="ts">
import { useToast } from "primevue/usetoast";
import { computed, defineAsyncComponent, watch , reactive, ref} from "vue";
import useIncome from "../../../../composables/modules/income/useIncomeComposable";
import type { Field } from "../types/Field";
const AttributeForm = defineAsyncComponent(() => import("./AttributeForm.vue"));

const { formIncome, sendIncome, stores,suppliers, products, updateDetails, messageSendIncome } = useIncome();
const toast = useToast();

watch( 
    () => messageSendIncome.open,
    (newVal) => {
        if (newVal) {
            toast.add({severity: messageSendIncome.type, summary: 'Notificación', detail: messageSendIncome.message, life: 3000});
            messageSendIncome.open = false; // Reset after showing
        }
    },
    { deep: true }
);
 const childRef = ref(null)

const invoiceFields: any = computed(() =>[
  {
    key: "product",
    label: "SKU Producto",
    type: "selection",
    options: products.value,
    placeholder: "Nombre del producto",
  },
  {
    key: "lote",
    label: "Lote/serie",
    type: "text",
  },
  {
    key: "quantity",
    label: "Cantidad",
    type: "number",
    placeholder: "0.00",
    total: true,
  },
  {
    key: "price",
    label: "Precio Unitario",
    type: "number",
    placeholder: "0.00",
    total: true,
  }
  
]);

// Campos para detalles de producto


const initialProductData = reactive([]);

// Event handlers
const onInvoiceLinesChange = (items: any[]) => {
  console.log("Líneas de factura actualizadas:", items);
    updateDetails(items);

};

const onProductDetailsChange = (items: any[]) => {
    updateDetails(items);
};

const onItemAdded = (item: any) => {
  console.log("Nueva línea agregada:", item);
};

const onItemRemoved = (index: number) => {
  console.log("Línea eliminada en índice:", index);
};

const onItemChanged = (item: any, field: string) => {
  console.log("Campo cambiado:", field, "Nuevo valor:", item[field]);
};

const sendIncomeFn =async()=>{
  await sendIncome()
  if(childRef.value){
    childRef.value.clearItems()
  }
}
</script>