<template>
    <div class="grid-l">
        <h3 class="title">Register</h3>
        <form action="" class="form">
            <div class="input">
                <label for="firstName">
                    first Name
                </label>
                <input type="text" id="firstName" placeholder="First Name" v-model="form.first_name">
            </div>
            <div class="input">
                <label for="lastName">
                    Last name
                </label>
                <input type="text" id="lastName" placeholder="Last Name" v-model="form.last_name">
            </div>
            <div class="input">
                <label for="phonenum">
                    phone number
                </label>
                <input type="tel" id="phonenum" placeholder="Phone" v-model="form.phone_number">
            </div>
            <div class="input">
                <label for="email">
                    email address
                </label>
                <input type="email" id="email" placeholder="Email" v-model="form.email">
            </div>
            <div class="input">
                <label for="pass">
                    password
                </label>
                <input type="password" id="pass" placeholder="Wirte your password" v-model="form.password">
            </div>
            <div class="input">
                <label for="passconfirm">
                    Confirm password
                </label>
                <input type="password" id="passconfirm" placeholder="Confirm Password" v-model="form.password_confirmation">
            </div>
            <ul class="list-rest mb-0 text-center mb-4 social-media">
                <li class="inline-block"><a href="#"><i class="fab fa-facebook-f"></i></a></li>
                <li class="inline-block"><a href="#"><i class="fab fa-twitter"></i></a></li>
            </ul>
            <button class="default_btn br-radius mt-0" @click.stop.prevent="register">Register</button>
            <p class="text-center p-3 mb-0">If You Have Account</p>
            <button class="default_btn btn2 br-radius mt-0" @click.stop.prevent="geToLogin">Login</button>

            <div>
                <has-error :form="form" field="first_name" class="notify warning active"></has-error>
                <has-error :form="form" field="last_name" class="notify warning active"></has-error>
                <has-error :form="form" field="phone_number" class="notify warning active"></has-error>
                <has-error :form="form" field="email" class="notify warning active"></has-error>
                <has-error :form="form" field="password" class="notify warning active"></has-error>
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
    components:{
        HasError
    },
    data(){
        return{
            form: new Form({
                first_name:'',
                last_name:'',
                phone_number:'',
                email:'',
                password:'',
                password_confirmation:''
            }),
            loading:false
        }
    },
    beforeCreate(){
        if(JSON.parse(localStorage.getItem('restaurant_token'))){
            this.$router.push('/')
        }
    },
    methods:{
        register(){
            this.loading = true
            this.form.post('/register')
            .then((res => {
                setTimeout(() => {
                    this.loading = false;
                    this.$router.push('/')
                })
                localStorage.setItem('restaurant_token',JSON.stringify(res.data.token))
                this.$axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
            }))
            .catch(error => {
                setTimeout(() => {
                    this.loading = false
                })
            })
        },
        geToLogin(){
            this.$router.push('/login')
        }
    }
}
</script>