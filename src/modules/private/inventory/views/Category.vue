<template>
    <Dialog v-model:visible="showModalCategory" header="Nueva categoría" :style="{ width: '25rem' }" modal>
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Crear nueva categoría de los productos/servicios.</span>

        <div class="flex items-center gap-4 mb-4">
            <label for="categoryName" class="font-semibold w-24">Categoría</label>
            <InputText id="categoryName" v-model="newCategory" class="flex-auto" autocomplete="off" />
        </div>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" severity="secondary" @click="onCancel" />
            <Button type="button" label="Crear" @click="onCreate" />
        </div>
    </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import useCategory from '../../../../composables/modules/product/categoryComposable';
import { uiStore } from '../../../../stores/uiStore';
import { storeToRefs } from 'pinia';
const uiStoreState = uiStore();
const { showModalCategory } = storeToRefs(uiStoreState);


const storeCategory = useCategory() as any;

// Desestructurar directamente; las propiedades que sean refs seguirán siéndolo
const {  setShowModalCategory, getAllCategories } = storeCategory;

const newCategory = ref('');

function onCancel() {
    newCategory.value = '';
    setShowModalCategory(false);
}

async function onCreate() {
    if (storeCategory.fnCreateCategory) {
        await storeCategory.fnCreateCategory(newCategory.value);
    } else {
        console.warn('fnCreateCategory no está definido en el composable');
    }

    if (getAllCategories) await getAllCategories();
    newCategory.value = '';
    setShowModalCategory(false);
}
</script>
