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

            <button class="default_btn br-radius mt-0" @click.stop.prevent="register">Register</button>
            <p class="text-center p-3 mb-0">If You Have Account</p>
            <button class="default_btn btn2 br-radius mt-0" @click.stop.prevent="geToLogin">Login</button>

            <div class="spinner absolute no-background" v-if="loading">
                <div class="loader"></div>
            </div>

        </form>
    </div>
</template>

<script>

export default {
    data(){
        return{
            form: {
                first_name:'',
                last_name:'',
                phone_number:'',
                email:'',
                password:'',
                password_confirmation:''
            },
            loading:false
        }
    },
    created(){ 
        if(JSON.parse(localStorage.getItem('restaurant_token'))){
            this.$router.push('/')
        }
    },
    methods:{
        register(){
            this.loading = true
            this.$axios.post('/register', this.form)
            .then((res => {
                setTimeout(() => {
                    this.loading = false;
                    localStorage.setItem('restaurant_profile',JSON.stringify(res.data.data))
                    localStorage.setItem('restaurant_token',JSON.stringify(res.data.token))
                    this.$axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                    if(res.data.data.verified){
                        if(JSON.parse(localStorage.getItem('router_previous')) == '/cart'){
                            this.$router.push('/checkout')
                        }
                        else{
                            this.$router.push('/')
                        }
                    }
                    else{
                        this.$router.push('/verify')
                    }
                })
            }))
            .catch(error => {
                this.loading = false
            })
        },
        geToLogin(){
            this.$router.push('/login')
        }
    }
}
</script>