<template>
    <div class="grid-l">
        <h3 class="title">login </h3>
        <form class="form">

            <div class="input">
                <label for="phonenum">
                    phone number
                </label>
                <input type="tel" 
                    id="phonenum" 
                    placeholder="Write your phone number" 
                    v-model="form.phone_number"
                    :class="{ 'is-invalid': form.errors.has('phone_number') }">
            </div>

            <div class="input">
                <label for="pass">
                    password
                </label>
                <input type="password"
                    id="pass"
                    placeholder="Wirte your password" 
                    v-model="form.password"
                    :class="{ 'is-invalid': form.errors.has('password') }">
            </div>

            <ul class="list-rest mb-0 text-center mb-4 social-media">
                <li class="inline-block"><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                <li class="inline-block"><a href="#"><i class="fab fa-twitter"></i></a></li>
            </ul>

            <button class="default_btn br-radius mt-0" @click.stop.prevent="login" type="submit" :disabled="form.busy">Login</button>
            <p class="text-center p-3 mb-0">If You Don't Have Account</p>
            <button class="default_btn btn2 br-radius mt-0" @click.stop.prevent="geToRegister">Register</button>
            
            <div>
                <has-error :form="form" field="password" class="notify warning active"></has-error>
                <has-error :form="form" field="phone_number" class="notify warning active"></has-error>
            </div>
            <div class="spinner absolute no-background" v-if="loading">
                <div class="loader"></div>
            </div>
        </form>
    </div>
</template>

<script>

import { Form, HasError, AlertError } from 'vform'

export default {
    data(){
        return{
            form: new Form({
                phone_number: '',
                password: '',
            }),
            token:JSON.parse(localStorage.getItem('restaurant_token')),
            loading:false,
            routePrevious:''
        }
    },
    watch:{

    },
    beforeCreate(){
        if(JSON.parse(localStorage.getItem('restaurant_token'))){
            this.$router.push('/')
        }
    },
    components:{
        HasError
    },
    methods:{
        login(){
            this.loading = true;
            this.form.post('/login')
            .then((res => {
                setTimeout(() => {
                    this.loading = false;
                })
                localStorage.setItem('restaurant_token',JSON.stringify(res.data.token))
                this.$axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                if(JSON.parse(localStorage.getItem('router_previous')) == '/cart'){
                    this.$router.push('/checkout')
                }
                else{
                    this.$router.push('/')
                }
                
            }))
            .catch(error => {
                
                setTimeout(() => {
                    this.loading = false
                })
            })
        },
        geToRegister(){
            this.$router.push('/register')
        },
        
    }
}
</script>