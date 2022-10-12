import { createApp } from 'vue';
import App from './App.vue';

// import support SSR
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import './assets/style.css';

createApp(App).use(VueSweetalert2).mount('#app');
