<template>
  <div class="p-4">

    <div class="mt-6">
      <AttributeForm
      ref="chilRefAtribute"
        title="Atributo del producto"
        :fields="productFields"
        :initial-data="initialProductData"
        :atributeDetails="atributeDetails"
        @change="onProductDetailsChange"
        @itemChanged="(val)=>changeItem(val)"
        @addNew="fnShowModalAtribute"
      />
    </div>
    <CreateAtribute :getAtributes="getAtributes"/>
    <AtributeDetailModal />
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, computed, ref } from 'vue';
import type { Field } from '../types/Field';
import useAtribute from '../../../../composables/modules/product/atributeComposable';
import useAtributeDetail from '../../../../composables/modules/product/atributeDetailComposable';

const {atributeDetails} = useAtributeDetail();
const {setShowModalAtribute, atributes, getAtributes, setShowModalAtributeDet} = useAtribute()
const AttributeForm = defineAsyncComponent(() => import('./AttributeForm.vue'));
const CreateAtribute = defineAsyncComponent(() => import('./CreateAtribute.vue'));
const AtributeDetailModal = defineAsyncComponent(() => import('../../billing/AtributeDetailModal.vue'));

const chilRefAtribute = ref<InstanceType<typeof AttributeForm> | null>(null);


const fnShowModalAtribute = () => {
  setShowModalAtribute(true)
};

onMounted(async () => {
  await getAtributes();
});

function function1() {

  fnShowModalAtribute()
}

function function2(valueKey:any) {
  console.log('Function 2 called', valueKey);
  setShowModalAtributeDet(true)
}

// Campos para detalles de producto
const productFields = computed((): Field[] =>  [
  {
    key: 'atribute',
    label: 'Atribute',
    type: 'selectionadd',
    functionAdd: function1,
    options: atributes.value.map((attr) => {
      return {  
      label: attr.atribute_des,
      value: attr.atribute_id}
    }),
  },
  {
    key: 'atribute2',
    label: 'Detalle de atributo',
    type: 'selectionadd',
    functionAdd: function2,
    options: [
    {
      label: 'label1',
      value: 'value1'
    }
  ]
  },
  {
    key: 'active',
    label: 'Activo',
    type: 'boolean'
  }
]);

const props = defineProps<{
  setAtributeVariants: (variants:any) => void;
}>();


const initialProductData:any = [];

// Event handlers
const onInvoiceLinesChange = (items: any[]) => {
  console.log('Líneas de factura actualizadas:', items);
};

const onProductDetailsChange = (items: any[]) => {
  console.log('Detalles de producto actualizados:', items);
  props.setAtributeVariants(items);
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

const changeItem = (val:any) => {

  chilRefAtribute.value?.updateFieldOptions(val.id, 'atribute2', [
    {
      label: 'label2',
      value: 'value2'
    }
  ]);

}



</script>