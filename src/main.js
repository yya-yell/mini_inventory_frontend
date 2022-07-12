import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';
require('@/store/header')
axios.defaults.baseURL = 'http://localhost:8000/api';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {store} from './store'
store.dispatch('fetchAuthUser' , localStorage.getItem('token')).then(()=>{
    const app = createApp(App);
    app.use(router);
    app.use(store);
    app.mount('#app');
})
