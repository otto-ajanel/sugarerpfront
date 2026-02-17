<template>
  <div class="odoo-one-to-many">
    <!-- Header estilo Odoo -->
    <div class="odoo-header">
      <div class="header-left">
        <i class="pi pi-list mr-2 text-primary"></i>
        <span class="header-title">{{ title }}</span>
        <Badge v-if="items.length > 0" :value="items.length" class="ml-2" />
      </div>
     
    </div>

    <!-- Tabla estilo Odoo -->
    <div class="odoo-table-container" v-if="items.length > 0">
      <DataTable 
        :value="items" 
        dataKey="id"
        :scrollable="true"
        scrollHeight="flex"
        class="odoo-table p-datatable-sm"
        :pt="{
          table: { class: 'odoo-table-main' },
          thead: { class: 'odoo-thead' },
          tbody: { class: 'odoo-tbody' }
        }"
      >
        <!-- Columna de secuencia -->
        <Column header="#" style="width: auto">
          <template #body="{ index }">
            <div class="sequence-cell">
              {{ index + 1 }}
            </div>
          </template>
        </Column>

        <!-- Campos dinámicos -->
        <Column 
          v-for="field in fields" 
          :key="field.key"
          :field="field.key"
          :header="field.label"
          :style="field.style"
        >
          <template #body="{ data }">
            <div class="field-cell">
              <!-- Input Text -->
              <InputText 
                v-if="field.type === 'text'"
                v-model="data[field.key]"
                class="odoo-input"
                :placeholder="field.placeholder"
                @change="onFieldChange(data, field.key)"
              />

              <!-- Number Input -->
              <InputNumber 
                v-else-if="field.type == 'number'"
                v-model="data[field.key]"
                mode="decimal"
                :minFractionDigits="2"
                :maxFractionDigits="2"
                class="odoo-input"
                :placeholder="field.placeholder"
                @value-change="onFieldChange(data, field.key)"
              />
              <label
                v-else-if="field.type == 'label'"
                class="odoo-label"
                :minFractionDigits="2"
                :maxFractionDigits="2"
                :placeholder="field.placeholder"
                @value-change="onFieldChange(data, field.key)"
              >{{data[field.key]}}</label>

              <!-- Dropdown -->
              <Dropdown 
                v-else-if="field.type === 'selection'"
                v-model="data[field.key]"
                :options="field.options"
                optionLabel="label"
                optionValue="value"
                class="odoo-input"
                :placeholder="field.placeholder"
                @change="onFieldChange(data, field.key)"
              />

              <!-- Checkbox -->
              <Checkbox 
                v-else-if="field.type === 'boolean'"
                v-model="data[field.key]"
                :binary="true"
                @change="onFieldChange(data, field.key)"
              />

              <!-- Display simple -->
              <span v-else>
                {{ data[field.key] }}
              </span>
            </div>
          </template>
        </Column>

        <!-- Columna de acciones -->
        <Column header="Acciones" style="width: auto">
    <template #body="{ index }">
            <div class="action-buttons">
              <Button 
                icon="pi pi-plus" 
                severity="primary" 
                text 
                rounded
                size="small"
                @click="plusQuantityItem(index)"
                v-tooltip.bottom="'Aumentar 1'"

              />
              <Button 
                icon="pi pi-trash" 
                severity="danger" 
                text 
                rounded
                size="small"
                @click="removeItem(index)"
                v-tooltip="'Eliminar línea'"
              />
              <Button 
                icon="pi pi-minus" 
                severity="danger" 
                text 
                rounded
                size="small"
                @click="lessQuantityItem(index)"
                v-tooltip="'Disminuir 1'"
              />
              <Button 
                v-if="index > 0"
                icon="pi pi-arrow-up" 
                severity="secondary" 
                text 
                rounded
                size="small"
                @click="moveItemUp(index)"
                v-tooltip="'Mover arriba'"
              />
              <Button 
                v-if="index < items.length - 1"
                icon="pi pi-arrow-down" 
                severity="secondary" 
                text 
                rounded
                size="small"
                @click="moveItemDown(index)"
                v-tooltip="'Mover abajo'"
              />
            </div>
          </template>
        </Column>
      </DataTable>
    </div>

    <!-- Estado vacío -->
    <div v-else class="odoo-empty-state">
      <div class="empty-content">
        <i class="pi pi-inbox text-6xl text-300 mb-3"></i>
        <h4>No hay registros</h4>
        <p>Haz clic en "Agregar Línea" para comenzar</p>
        
      </div>
    </div>

    <!-- Totales estilo Odoo -->
    <div v-if="showTotals && items.length > 0" class="odoo-totals">
      <div class="total-row" v-for="total in calculatedTotals" :key="total.label">
        <span class="total-label">{{ total.label }}:</span>
        <span class="total-value">{{ total.value }}</span>
      </div>
       <Button 
        color="primary"
        label="Pagar"
        fluid
       />
    </div>
    <Toast/>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useToast } from 'primevue/usetoast';
 const toast =useToast()
import type { Field } from './types/Field';

import { inject } from 'vue';

const order = inject<any>('order')!;
const items = order.detailOrder;

interface Props {
  title?: string;
  fields: Field[];
  initialData?: any[];
  showTotals?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Líneas Detalladas',
  initialData: () => [],
  showTotals: false
});

const emit = defineEmits<{
  change: [items: any[]];
  itemAdded: [item: any];
  itemRemoved: [index: number];
  itemChanged: [item: any, field: string];
}>();

let nextId = 1;

// Inicializar con datos si existen
watch(() => props.initialData, (newData) => {
  items.value = newData.map(item => ({
    id: nextId++,
    ...item
  }));
}, { immediate: true });

// Totales calculados
const calculatedTotals = computed(() => {
  if (!props.showTotals) return [];
  
  const totals: { label: string; value: string }[] = [];
    totals.push({
    label: 'Total Líneas',
    value: items.value.length.toString()
  });
  props.fields.forEach(field => {
    if (field.total && field.key === 'price') {
      const sum = items.value.reduce((acc, item) => {
        return acc + (Number(item['quantity'])*(Number(item['price'])) || 0);
      }, 0);
      
      totals.push({
        label: `Precio total`,
        value:  new Intl.NumberFormat('es-GT', {
          style: 'currency',
          currency: 'GTQ'
        }).format(sum)
      });
    }
    
  });

  // Total de líneas


  return totals;
});

// Métodos
const addItem = (productData:any, quantity=1) => {
  const newItem: any = { id: nextId++ };
  
  // Inicializar campos con valores por defecto
  props.fields.forEach(field => {
    switch (field.type) {
      case 'text':
        newItem[field.key] = '';
        break;
      case 'number':
        newItem[field.key] = 0;
        break;
      case 'boolean':
        newItem[field.key] = false;
        break;
        case 'text':
        newItem[field.key] = '';
        break;
      case 'selection':
        newItem[field.key] = null;
        break;
    }
  });
  const index =items.value.findIndex((i:any) =>i.product_id==productData.ProductId && i.store_id==productData.locations[0].store_id)
  if(index!=-1){
    if(items.value[index].quantity>= items.value[index].count_available){
          toast.add({ severity: 'warn', summary: 'Inventario ', detail: 'Ya no cuenta con mas productos.', life: 3000 });

    }else{

      items.value[index].quantity = items.value[index].quantity + quantity
    }
  }else{

    newItem['product']=productData.ProductDes
    newItem['quantity']=quantity
    newItem['product_id']= productData.ProductId
    newItem['store_id']= productData.locations[0].store_id
    newItem['price']= productData.Price 
    newItem['count_available']=productData.locations[0].count_available
    items.value.push(newItem);
    emit('itemAdded', newItem);
  }
  emit('change', items.value);
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
  emit('itemRemoved', index);
  emit('change', items.value);
};
const plusQuantityItem = (index: number) => {
  
  if(items.value[index].quantity>=items.value[index].count_available){
          toast.add({ severity: 'warn', summary: 'Inventario ', detail: 'Ya no cuenta con mas productos.', life: 3000 });

  }else{
    items.value[index].quantity+=1
  }

  emit('change', items.value);
};

const lessQuantityItem = (index: number) => {
  items.value[index].quantity -=1
  if(items.value[index].quantity<=0){
    removeItem(index)
  }
  emit('change', items.value);
};

const moveItemUp = (index: number) => {
  if (index > 0) {
    const item = items.value[index];
    items.value.splice(index, 1);
    items.value.splice(index - 1, 0, item);
    emit('change', items.value);
  }
};

const moveItemDown = (index: number) => {
  if (index < items.value.length - 1) {
    const item = items.value[index];
    items.value.splice(index, 1);
    items.value.splice(index + 1, 0, item);
    emit('change', items.value);
  }
};

const onFieldChange = (item: any, fieldKey: string) => {
  emit('itemChanged', item, fieldKey);
  emit('change', items.value);
};

// Exponer métodos para el padre
defineExpose({
  getItems: () => items.value,
  addItem,
  clearItems: () => {
    items.value = [];
    emit('change', items.value);
  }
});
</script>

<style scoped>
.odoo-one-to-many {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: white;
  overflow: hidden;
}

.odoo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: #f8fafc;
  border-bottom: 1px solid #e2e8f0;
}

.header-left {
  display: flex;
  align-items: center;
}

.header-title {
  font-weight: 600;
  color: #2d3748;
  font-size: 1.1rem;
}

.odoo-table-container {
  max-height: 400px;
  overflow: auto;
}

.odoo-table {
  border: none;
}

:deep(.odoo-table-main) {
  border: none;
  border-radius: 0;
}

:deep(.odoo-thead) {
  background: #edf2f7 !important;
  border-bottom: 2px solid #e2e8f0;
}

:deep(.odoo-thead th) {
  background: #edf2f7 !important;
  border: none !important;
  font-weight: 600;
  color: #4a5568;
  padding: 0.75rem 1rem;
}

:deep(.odoo-tbody tr) {
  border-bottom: 1px solid #e2e8f0;
  transition: background-color 0.2s;
}

:deep(.odoo-tbody tr:hover) {
  background: #f7fafc !important;
}

:deep(.odoo-tbody td) {
  border: none !important;
  padding: 0.75rem 1rem;
  vertical-align: top;
}

.sequence-cell {
  text-align: center;
  color: #718096;
  font-weight: 500;
  font-size: 0.875rem;
}

.field-cell {
  min-height: 40px;
  display: flex;
  align-items: center;
}

:deep(.odoo-input) {
  width: auto;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  font-size: 0.875rem;
  max-width: auto;
}

:deep(.odoo-input:focus) {
  border-color: #4299e1;
  box-shadow: 0 0 0 1px #4299e1;
}

.action-buttons {
  display: flex;
  gap: 0.25rem;
  justify-content: center;
}

.odoo-empty-state {
  padding: 3rem 2rem;
  text-align: center;
  color: #718096;
}

.empty-content h4 {
  margin: 0.5rem 0;
  color: #4a5568;
}

.odoo-totals {
  padding: 1rem 1.5rem;
  background: #f0fff4;
  border-top: 1px solid #c6f6d5;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
}

.total-row {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.total-label {
  font-weight: 600;
  color: #2d3748;
}

.total-value {
  font-weight: 700;
  color: #2b6cb0;
}
</style>