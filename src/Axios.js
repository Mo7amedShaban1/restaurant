import Vue from 'vue'
import axios from 'axios'
import router from './router'
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

const axiosWithOutHeader = Vue.prototype.axiosWithOutHeader = axios.create()

axios.interceptors.response.use(
    response => response,
    (error => {
        if(error.response){
            let handleErrors = error.response.data.errors;
            if(error.response.status == 404){
                router.push('/oops')
            }
            else if(error.response.status == 422){
                document.querySelector('.notify.warning').classList.add('active')
                document.querySelector('.notify.warning').innerHTML = Object.values(handleErrors)[0][0];
                setTimeout(() => {
                    document.querySelector('.notify.warning').classList.remove('active')
                },3000)
            }
        }
        else{
            document.querySelector('.notify.warning').classList.add('active')
            document.querySelector('.notify.warning').innerHTML = " no connection to the internet ";
        }
        return Promise.reject(error.response);
    })
);

axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
axios.defaults.headers.common['X-Accept-Language'] = 'en';
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.baseURL = 'http://restaurant.laraeast.com/api/';
axios.defaults.timeout = 30000;

axiosWithOutHeader.defaults.headers = '';
