import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import i18n from "./i18n.js";

const app = createApp(App);


app.use(PrimeVue, {
    ripple: true,
    theme: {
        preset: Aura,
        options: {
            prefix: 'p',
            cssLayer: false
        }
    }
});

app.use(i18n);

app.mount('#app');