import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import i18n from "./i18n.js";
import ConfirmationService from "primevue/confirmationservice";
import Button from "primevue/button";
import Card from "primevue/card";
import Column from "primevue/column";
import ConfirmDialog from "primevue/confirmdialog";
import Checkbox from "primevue/checkbox";
import DataTable from "primevue/datatable";
import Dialog from "primevue/dialog";
import Select from "primevue/select";
import FileUpload from "primevue/fileupload";
import FloatLabel from "primevue/floatlabel";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Menu from "primevue/menu";
import Rating from "primevue/rating";
import Row from "primevue/row";
import Drawer from "primevue/drawer";
import Tag from "primevue/tag";
import Textarea from "primevue/textarea";
import Toolbar from "primevue/toolbar";
import Toast from "primevue/toast";
import SelectButton from "primevue/selectbutton";
import DialogService from "primevue/dialogservice";
import ToastService from "primevue/toastservice";
import Avatar from "primevue/avatar";
import router from "./router/index.js";
import Slider from "primevue/slider";
import CascadeSelect from "primevue/cascadeselect";
import Divider from "primevue/divider";
import DatePicker from "primevue/datepicker";

const app = createApp(App);
import {createPinia} from "pinia";


app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            cssLayer: false,
            darkModeSelector: false || 'none',
        }
    }
});

app.use(ConfirmationService)
    .use(DialogService)
    .use(ToastService)
    .use(router);

app.component('pv-button', Button)
    .component('pv-card', Card)
    .component('pv-column', Column)
    .component('pv-confirm-dialog', ConfirmDialog)
    .component('pv-checkbox', Checkbox)
    .component('pv-data-table', DataTable)
    .component('pv-dialog', Dialog)
    .component('pv-select', Select)
    .component('pv-file-upload', FileUpload)
    .component('pv-float-label', FloatLabel)
    .component('pv-icon-field', IconField)
    .component('pv-input-icon', InputIcon)
    .component('pv-input-text', InputText)
    .component('pv-input-number', InputNumber)
    .component('pv-menu', Menu)
    .component('pv-rating', Rating)
    .component('pv-row', Row)
    .component('pv-drawer', Drawer)
    .component('pv-tag', Tag)
    .component('pv-textarea', Textarea)
    .component('pv-toolbar', Toolbar)
    .component('pv-toast', Toast)
    .component('pv-avatar', Avatar)
    .component('pv-slider', Slider)
    .component('pv-divider', Divider)
    .component('pv-datepicker', DatePicker )
    .component('pv-select-button', SelectButton)
    .component('pv-cascade-select', CascadeSelect);


// Pinia
const pinia = createPinia();
app.use(pinia);

app.use(i18n);

app.mount('#app');

