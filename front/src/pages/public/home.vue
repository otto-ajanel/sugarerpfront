<template>
    <main id="home">
        <div class=" h-screen flex w-full flex-col sm:flex-row justify-center content-center p-8 items-center ">
            <div class="w-full sm:w-1/2 flex flex-col  p-8">

                <h2>
                    Building Innovative Systems for the <span> Digital</span> Age
                </h2>
                
                <p class="pt-8">
                    Technology solutions designed exclusively for you, with innovation, efficiency, and tangible results.
                </p>
                <Button label="Contact" severity="info" raised class="max-w-40 mt-8"/>
            </div>
            <div class="w-full flex justify-center">
                <Galleria :value="images" :numVisible="2" containerStyle="max-width: 600px; max-heigth: 150px" :showThumbnails="false"
                    :showIndicators="false" :circular="true" :autoPlay="true" :transitionInterval="8000">
                    <template #item="slotProps">
                        <img :src="slotProps.item.itemImageSrc" :alt="slotProps.item.alt"
                            style="width: 100%; display: block" />
                    </template>
                </Galleria>
            </div>
        </div>
    </main>
</template>
<script setup lang="ts">
import img1 from '../../assets/imgs/homeImages/pexels-pavel-danilyuk-6612717.jpg'
import img2 from '../../assets/imgs/homeImages/pexels-photo-5716032.jpeg'
import img3 from '../../assets/imgs/homeImages/pexels-pixabay-38568.jpg'
import img4 from '../../assets/imgs/homeImages/pexels-tima-miroshnichenko-5717202.jpg'

import { ref } from 'vue'
import {
    Button,
    Galleria
} from 'primevue'

const images = ref([
    {
        itemImageSrc:img1 
    },
    {
        itemImageSrc:img2 
    },
    {
        itemImageSrc:img3 
    },
    {
        itemImageSrc:img4 
    },

])
</script>
<style>
h2{
    font-size:48px;
    font-weight: 700;
}
h2 > span{
    color: theme('colors.blue.800')
}
</style>