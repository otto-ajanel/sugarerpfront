<template>
  <div class="p-4">

    <div class="mt-6">
      <AttributeForm
        title="Atributo del producto"
        :fields="productFields"
        :initial-data="initialProductData"
        @change="onProductDetailsChange"
        @addNew="fnShowModalAtribute"
      />
    </div>
    <CreateAtribute />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, computed } from 'vue';
import type { Field } from '../types/Field';
import useAtribute from '../../../../composables/modules/product/atributeComposable';

const {setShowModalAtribute, atributes, getAtributes} = useAtribute()
const AttributeForm = defineAsyncComponent(() => import('./AttributeForm.vue'));
const CreateAtribute = defineAsyncComponent(() => import('./CreateAtribute.vue'));

const fnShowModalAtribute = () => {
  setShowModalAtribute(true)
};

onMounted(async () => {
  await getAtributes();
});

// Campos para detalles de producto
const productFields = computed((): Field[] =>  [
  {
    key: 'atribute',
    label: 'Atribute',
    type: 'selectionadd',
    options: atributes.value.map((attr) => {
      return {  
      label: attr.atribute_des,
      value: attr.atribute_id}
    }),
  },
  {
    key: 'atribute2',
    label: 'Detalle de atributo',
    type: 'selection',
    options: [
      { label: 'atribute uno ', value: 'atribute1' },
      { label: 'atribute dos', value: 'atribute2' } 
 
    ]
  },
  {
    key: 'active',
    label: 'Activo',
    type: 'boolean'
  }
]);

const initialProductData = [];

// Event handlers
const onInvoiceLinesChange = (items: any[]) => {
  console.log('Líneas de factura actualizadas:', items);
};

const onProductDetailsChange = (items: any[]) => {
  console.log('Detalles de producto actualizados:', items);
};

const onItemAdded = (item: any) => {
  console.log('Nueva línea agregada:', item);
};

const onItemRemoved = (index: number) => {
  console.log('Línea eliminada en índice:', index);
};

const onItemChanged = (item: any, field: string) => {
  console.log('Campo cambiado:', field, 'Nuevo valor:', item[field]);
};
</script>