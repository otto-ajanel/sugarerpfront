<template>
    <Dialog v-model:visible="showModalCategory"
    header="Nueva categoría" :style="{ width: '25rem' }" modal>
    <span class="text-surface-500 dark:text-surface-400 block mb-8">Crear nueva categoría de los productos/servicios.</span>
    <div class="flex items-center gap-4 mb-4">
        <label for="username" class="font-semibold w-24">Categoria</label>
        <InputText id="username" v-model="newCategory" class="flex-auto" autocomplete="off" />
    </div>

    <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="fnShowModalCategory(false)"></Button>
        <Button type="button" label="Crear" @click="sendNewCateory "></Button>
    </div>
</Dialog>
</template>
<script lang="ts" setup>
import { uiStore } from "../../../../stores/uiStore";
import useCategoryStore from "../../../../composables/modules/product/categoryComposable";  
import { storeToRefs  } from "pinia";
import { ref } from "vue";

const { 
    fnShowModalCategory
} = uiStore();

const useUiStore = uiStore();

const {showModalCategory}= storeToRefs(useUiStore);
const {fnCreateCategory} = useCategoryStore();

const newCategory =ref("")
function sendNewCateory(){
    fnCreateCategory(newCategory.value)
    newCategory.value=""
    fnShowModalCategory(false)
}



</script>
