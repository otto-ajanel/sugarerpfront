<template>
    <Dialog v-model:visible="showModule" modal @hide="uiStoreState.changeShowmodule(false)" header="Modulos" class="lg:w-200 md:w-3/4 w-8/10 bg-surface-50">
            <div class=" flex-wrap justify-between ">
                <Button 
                aria-label="Filter"  variant="outlined"  
                class="m-2 min-w-32 "
                iconClass="text-4xl"
                @click="uiStoreState.filterMenu(mod.id_module)"
                v-for="(mod,index) in modules" :key="index" :label="mod.module_name" :icon="'pi '+ mod.icon_module" iconPos="top" />
            </div>
        </Dialog>
</template>
<script setup lang="ts">

import { uiStore } from '../../../stores/uiStore';
import { storeToRefs } from 'pinia';

const uiStoreState = uiStore()
const {showModule, modules} = storeToRefs(uiStoreState)



</script>