import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
Vue.prototype.$axios = axios;

const MAP_KEY = Vue.prototype.MAP_KEY = 'AIzaSyCzTWH228K7ewwxYjhiMjD_H2BQekMDt9w';
const token = JSON.parse(localStorage.getItem('restaurant_token'));
Vue.use(VueGoogleMaps, {
    load: {
        key: MAP_KEY,
        libraries: 'places', // This is required if you use the Autocomplete plugin
        language: 'en'
    },
});

const axiosInst = Vue.prototype.axiosInstance = axios.create()

const axiosWithOutHeader = Vue.prototype.axiosWithOutHeader = axios.create()

axiosInst.interceptors.response.use(
    response => response,
    (error => {
        if (error.response) {
            if(error.response.status == 404){
                router.push('/oops')
            }
        } 
        else {
            document.querySelector('.notify-internet').classList.add('active');
        }
    })
)

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.common['X-Accept-Language'] = 'en';
axios.defaults.baseURL = 'http://restaurant.laraeast.com/api/';
axios.defaults.timeout = 10000;

axiosWithOutHeader.defaults.headers = '';


import './assets/style/main.scss'

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})


