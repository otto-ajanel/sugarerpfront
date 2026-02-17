<template>
    <main class="flex flex-col sm:flex-row w-full bg-surface-950 text-white p-8 gap-8 justify-center">
        <section class="w-1/3 flex-col sm:w-1/3 flex sm:flex-col  justify-center items-center content-center">
            <Image
            :src="logo"
            width="150"
            />
            <h3>Otto Ajanel </h3>
        </section>
        <section class="w-full  sm:w-1/3 flex flex-col sm:flex-col items-center">
            <h3 class="font-bold">Stack</h3>
            <br>
            <p>Vuejs</p>
            <p>nodejs </p>
            <p>laravel</p>
            <p>tailwindcss</p>
            <p>postgres</p>


        </section>
        <section class="w-full flex-col sm:w-1/3 flex sm:flex-col justify-center ">

            <div class="flex justify-center gap-2">
                <FloatLabel>
                    <IconField>
                        <InputIcon class="pi pi-envelope" />
                        <InputText id="over_label" v-model="email" autocomplete="off" type="text" />
                    </IconField>
                    <label for="over_label">Email</label>
                </FloatLabel>
                <Button label="Send email" severity="info" />

            </div>
            <div class="flex justify-center content-center p-4">
                <Button icon="pi pi-github" style="font-size: 1.5rem" severity="secondary" variant="text" raised rounded aria-label="Bookmark" />
                <Button icon="pi pi-instagram" style="font-size: 1.5rem" severity="warn" variant="text" raised rounded aria-label="Notification" />
                <Button icon="pi pi-whatsapp" style="font-size: 1.5rem" severity="success" variant="text" raised rounded aria-label="Search" />
                <Button icon="pi pi-facebook" style="font-size: 1.5rem" severity="info" variant="text" raised rounded aria-label="User" />
                <Button icon="pi pi-youtube"  severity="danger" variant="text" raised rounded aria-label="Notification" style="font-size: 1rem"/>

            </div>

        </section>

    </main>
</template>
<script setup lang="ts">
import logo from '../../../assets/imgs/oaLogo.png'
    

import {ref} from 'vue'
const email = ref("")

</script>