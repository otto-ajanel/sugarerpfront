<template>
<main id="login" class="h-full w-full flex flex-col sm:flex-row  items-center content-center p-8 sm:p-36">
    <div class="w-full">
        <Image :src="imageLogin"/>
    </div>
    <div class="w-full flex justify-center content-center items-center">

        <form class=" w-full sm:w-96 flex flex-col items-center p-8  gap-4 rounded-lg shadow-2xl">
            <label class="text-primary font-bold" for="">LOGIN</label>
            <IconField  class=" w-full">
                <InputIcon class="pi pi-envelope" />
                <InputText  class="w-full" v-model="email" placeholder="Email" type="email" />
            </IconField>
            <IconField class="w-full" >
                <InputIcon class="pi pi-eye-slash " />
                <InputText v-model="pass" placeholder="Password" type="password" class="w-full"/>
            </IconField>

            <Button label="Sign" class="w-full" />
        </form>
    </div>

</main>
</template>
<script lang="ts" setup>
import {ref} from 'vue'
import imageLogin from '../../assets/imgs/homeImages/loginimages/undraw_design-components_529l.svg'

const email  =  ref("")
const pass  =  ref("")

</script>

<style>

</style>