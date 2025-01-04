import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import './assets/flag.css'
import PrimeVue from 'primevue/config';
// @ts-ignore
import Noir from '../src/assets/Noir.js';

import 'primeicons/primeicons.css'

const app = createApp(App);
app.use(PrimeVue, {
    theme:{
        preset:Noir,
        options: {
            prefix: 'p',
            darkModeSelector: '.p-dark',
            cssLayer:{
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
});

app.mount('#app')
