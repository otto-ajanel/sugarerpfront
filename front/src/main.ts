import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import StyleClass from "primevue/styleclass";
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import Ripple from 'primevue/ripple';
import FileUpload from 'primevue/fileupload';
import Checkbox from "primevue/checkbox";
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield'; 
import InputIcon from 'primevue/inputicon'; 
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';
import aura from '../src/assets/presets/aura'


import router from "./routes";
import {createPinia} from 'pinia'

const pinia = createPinia()

const app = createApp(App);
app.use(PrimeVue, { unstyled: true,
    pt:aura
 });
app.use(pinia)
app.use(router)
app.use(ToastService)
app.component('FileUpload', FileUpload);
app.component('Checkbox', Checkbox);
app.component('InputText', InputText);
app.component('IconField', IconField);
app.component('InputIcon', InputIcon);
app.component('FloatLabel', FloatLabel);
app.component('Textarea', Textarea);   
app.directive("styleclass", StyleClass);
app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);

app.mount("#app");