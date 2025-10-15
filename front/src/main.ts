import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import PrimeVue from "primevue/config";
import StyleClass from "primevue/styleclass";
import ToastService from 'primevue/toastservice';
import Select from "primevue/select";
import Tooltip from 'primevue/tooltip';
import Ripple from 'primevue/ripple';
import FileUpload from 'primevue/fileupload';
import Checkbox from "primevue/checkbox";
import InputText from 'primevue/inputtext';
import IconField from 'primevue/iconfield'; 
import InputIcon from 'primevue/inputicon'; 
import FloatLabel from 'primevue/floatlabel';
import Textarea from 'primevue/textarea';
import Button from 'primevue/button';
import MultiSelect from 'primevue/multiselect';
import Avatar from "primevue/avatar";
import Badge from "primevue/badge";
import Tabs from "primevue/tabs";
import TabList from "primevue/tablist";
import TabPanel from "primevue/tabpanel";
import Tab from "primevue/tab";
import TabPanels from "primevue/tabpanels";
import RadioButton from "primevue/radiobutton";
import InputNumber from "primevue/inputnumber";
import Dialog from "primevue/dialog";

import Aura from './assets/presets/Noir.js'
import AnimateOnScroll from 'primevue/animateonscroll';


import router from "./routes";
import {createPinia} from 'pinia'


const pinia = createPinia()

const app = createApp(App);
app.use(PrimeVue, { theme:{
    preset:Aura,
},
ripple: true

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
app.component('Button', Button);
app.component('MultiSelect', MultiSelect);
app.component('Avatar', Avatar);
app.component('Badge', Badge);
app.component('Tabs', Tabs);
app.component('TabList', TabList);
app.component('Tab', Tab);
app.component('TabPanels', TabPanels);
app.component('TabPanel', TabPanel);
app.component('RadioButton', RadioButton);
app.component('InputNumber', InputNumber);
app.component('Select', Select);
app.component('Dialog', Dialog);
app.directive('animateonscroll', AnimateOnScroll);

app.directive("styleclass", StyleClass);
app.directive('tooltip', Tooltip);
app.directive('ripple', Ripple);

app.mount("#app");