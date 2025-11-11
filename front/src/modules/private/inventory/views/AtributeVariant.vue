<template>
  <div class="p-4">

    <div class="mt-6">
      <AttributeForm
        title="Atributo del producto"
        :fields="productFields"
        :initial-data="initialProductData"
        @change="onProductDetailsChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import type { Field } from '../types/Field';

const AttributeForm = defineAsyncComponent(() => import('./AttributeForm.vue'));

// Campos para detalles de producto
const productFields: Field[] = [
  {
    key: 'atribute',
    label: 'Atribute',
    type: 'selection',
    options: [
      { label: 'atribute uno ', value: 'atribute1' },
      { label: 'atribute dos', value: 'atribute2' } 
 
    ]
  },
  {
    key: 'atribute',
    label: 'Atribute',
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
];

const initialProductData = [
  { attribute: 'Color', value: 'Rojo', priceExtra: 10.00, active: true },
  { attribute: 'Tamaño', value: 'Grande', priceExtra: 15.00, active: true }
];

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