import {createApp} from 'vue'
import {createPinia} from 'pinia'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import '@vueup/vue-quill/dist/vue-quill.bubble.css';

// import VueSimplemde from 'vue-simplemde'


import App from './App.vue'
import router from './router/index.js'

import './assets/main.css'

const app = createApp(App)
const pinia = createPinia()
// app.component('VueSimplemde', VueSimplemde)
app.component('QuillEditor', QuillEditor)

app.use(pinia)
app.use(router)
app.mount('#app')
