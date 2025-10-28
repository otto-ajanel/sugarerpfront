<template>
  <main id="home">
    <div
      class="h-screen flex w-full flex-col sm:flex-row justify-center content-center p-8 items-center"
    >
      <div class="w-full sm:w-1/2 flex flex-col p-8">
        <h2>Building Innovative Systems for the <span> Digital</span> Age</h2>

        <p class="pt-8">
          Technology solutions designed exclusively for you, with innovation,
          efficiency, and tangible results.
        </p>
        <Button label="Contact" severity="info" raised class="max-w-40 mt-8" />
      </div>
      <div class=" relative w-full flex justify-center">
        <div class="relative h-108 w-96 overflow-hidden rounded-lg shadow-lg">
          <!-- Imágenes -->
           
           <div
            v-for="(image, index) in images"
            :key="index"
            class="absolute inset-0 w-108 transition-opacity duration-1000"
          :class="{
              'opacity-100': currentIndex === index,
              'opacity-0': currentIndex !== index
            }"
          >
            <img :src="image.itemImageSrc"
                class="w-full h-full object-cover"
             
                />
          </div>
        </div>
        
      </div>
    </div>
  </main>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount } from "vue";
import img1 from "../../assets/imgs/homeImages/pexels-pavel-danilyuk-6612717.jpg";
import img2 from "../../assets/imgs/homeImages/pexels-photo-5716032.jpeg";
import img3 from "../../assets/imgs/homeImages/pexels-pixabay-38568.jpg";
import img4 from "../../assets/imgs/homeImages/pexels-tima-miroshnichenko-5717202.jpg";

import { ref } from "vue";

const images = ref([
    {
        itemImageSrc: img2,
    },
    {
        itemImageSrc: img1,
    },
  {
    itemImageSrc: img3,
  },
  {
    itemImageSrc: img4,
  },
]);
const currentIndex = ref(0);
let intervalId:any = null;

// Avanzar automáticamente
const startInterval = () => {
  intervalId = setInterval(() => {
    nextImage();
  }, 3000); // 3 segundos
};
const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % images.value.length;
};
onMounted(() => {
  startInterval();
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});
</script>
<style>
h2 {
  font-size: 48px;
  font-weight: 700;
}
h2 > span {
  color: var(--p-primary-800);
}
</style>