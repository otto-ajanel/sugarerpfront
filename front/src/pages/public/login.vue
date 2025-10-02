<template>
    <main id="login" class="h-full w-full flex flex-col sm:flex-row  items-center content-center p-8 sm:p-36">
    <div class="w-full">
        <img :src="imageLogin"/>
    </div>
    <div class="w-full flex justify-center content-center items-center">

        <form class=" w-full sm:w-96 flex flex-col items-center p-8  gap-4 rounded-lg shadow-2xl">
            <img :src="imgsignin" width="100"/>
            <label class="text-primary font-bold" for="">LOGIN</label>
            <div class="flex items-stretch w-full">
            <span class="flex items-center justify-center w-10 border-y border-s border-surface-300 dark:border-surface-700 bg-surface-0 dark:bg-surface-950 text-surface-400 rounded-s-md">
                <i class="pi pi-user"></i>
            </span>
            <InputText placeholder="Username" pt:root="flex-1 rounded-s-none rounded-e-md"  v-model="email" type="email" />
            </div>
            <div class="flex items-stretch w-full">
            <span class="flex items-center justify-center w-10 border-y border-s border-surface-300 dark:border-surface-700 bg-surface-0 dark:bg-surface-950 text-surface-400 rounded-s-md">
                <i class="pi pi-user"></i>
            </span>
            <InputText type="password" placeholder="Username" pt:root="flex-1 rounded-s-none rounded-e-md" v-model="pass" />
        </div>
    

            <Button label="Sign" class="w-full" @click="login(email,pass, toast)" />
        </form>
        <Toast />

    </div>
</main>
</template>
<script  setup lang="ts">
import {storeToRefs} from 'pinia'
import { useToast } from "primevue/usetoast";
import {ref, watch} from 'vue' 
import {authStore} from '../../stores/auth'
import imageLogin from '../../assets/imgs/homeImages/loginimages/undraw_design-components_529l.svg'
import imgsignin from '../../assets/imgs/homeImages/loginimages/undraw_fingerprint_kdwq.svg'
import {useRouter}from 'vue-router'
import Button from '@/volt/Button.vue'
import InputText from '@/volt/InputText.vue';
const toast = useToast()

const router = useRouter()

const email  =  ref("")
const pass  =  ref("")
const {login}= authStore() 
const {isAuth} = storeToRefs(authStore())

watch(isAuth, async(newValue, oldValue)=>{
if (newValue) {
    router.push('/erp')
}
})

</script>

<style>

</style>