import {createApp} from 'vue'
import {createPinia} from 'pinia'
import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';


import App from './App.vue'
import router from './router/index.js'

import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import {createVuetify} from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)
const pinia = createPinia()
// app.component('VueSimplemde', VueSimplemde)
app.component('QuillEditor', QuillEditor)

app.use(pinia)
app.use(router)
app.use(vuetify)
app.use(VueSweetalert2);
app.mount('#app')
