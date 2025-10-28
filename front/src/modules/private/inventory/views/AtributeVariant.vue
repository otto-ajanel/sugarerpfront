<template>
  <div class="p-4">
    <AttributeForm
      title="Líneas de Factura"
      :fields="invoiceFields"
      :show-totals="true"
      @change="onInvoiceLinesChange"
      @item-added="onItemAdded"
      @item-removed="onItemRemoved"
      @item-changed="onItemChanged"
    />

    <div class="mt-6">
      <AttributeForm
        title="Detalles de Producto"
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

// Campos para líneas de factura
const invoiceFields: Field[] = [
  {
    key: 'product',
    label: 'Producto',
    type: 'text',
    placeholder: 'Nombre del producto'
  },
  {
    key: 'quantity',
    label: 'Cantidad',
    type: 'number',
    placeholder: '0.00',
    total: true
  },
  {
    key: 'price',
    label: 'Precio Unitario',
    type: 'number',
    placeholder: '0.00',
    total: true
  },
  {
    key: 'tax',
    label: 'Impuesto',
    type: 'selection',
    options: [
      { label: 'IVA 12%', value: 0.12 },
      { label: 'IVA 0%', value: 0 },
      { label: 'Exento', value: 'exempt' }
    ]
  },
  {
    key: 'discount',
    label: 'Descuento',
    type: 'number',
    placeholder: '0.00'
  }
];

// Campos para detalles de producto
const productFields: Field[] = [
  {
    key: 'attribute',
    label: 'Atributo',
    type: 'text',
    placeholder: 'Color, Tamaño, etc.'
  },
  {
    key: 'value',
    label: 'Valor',
    type: 'text',
    placeholder: 'Valor del atributo'
  },
  {
    key: 'priceExtra',
    label: 'Precio Extra',
    type: 'number',
    placeholder: '0.00'
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