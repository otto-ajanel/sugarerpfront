import { createApp, h, provide } from 'vue'
import { createPinia } from 'pinia'

import './style.css'
import router from './routes/index.ts'
import App from './App.vue'
//import './assets/flag.css'
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice'
import ToastService from 'primevue/toastservice'
import  DialogService  from 'primevue/dialogservice'
import sugarApiGraphql from './graphql/sugarAPIGraphql.ts'
import {
    Tooltip,
    BadgeDirective,
    FocusTrap,
    AnimateOnScroll
    , Button
    , Image
    , IconField
    , InputText
    , InputIcon
    , FloatLabel
    , MegaMenu
    , Toast
} from 'primevue'
// @ts-ignore
import Aura  from './assets/presets/aura';
// @ts-ignore
import Noir from './assets/presets/Noir'
import 'primeicons/primeicons.css'
import { DefaultApolloClient } from '@vue/apollo-composable'

const app = createApp({
    setup(){
        provide(DefaultApolloClient,sugarApiGraphql)
    },
    render: ()=> h(App)});

app.use(PrimeVue, {
//unstyled:true,
ripple:true,
//pt:Aura
theme:{
    preset:Noir
    }
});
const pinia  = createPinia()
app.use(pinia)
app.use(router)

app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.component("Button", Button)
app.component("Image", Image)
app.component("IconField",IconField)
app.component("InputText", InputText)
app.component("InputIcon",InputIcon)
app.component("FloatLabel",FloatLabel)
app.component("MegaMenu",MegaMenu)
app.component("Toast",Toast)

app.directive('tooltip', Tooltip);
app.directive('badge', BadgeDirective);
app.directive('focustrap', FocusTrap);
app.directive('animateonscroll', AnimateOnScroll);


app.mount('#app')
