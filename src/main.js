import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Axios from './Axios'
import './assets/style/main.scss'

window.EventBus = new Vue();

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})


