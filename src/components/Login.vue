<template>
    <div class="grid-l">
        <div v-if="ifUserVerified">
            <h3 class="title">login </h3>
            <form class="form">

                <div class="input">
                    <label for="phonenum">
                        phone number
                    </label>
                    <input type="tel" 
                        id="phonenum" 
                        placeholder="Write your phone number" 
                        v-model="form.phone_number">
                </div>

                <div class="input">
                    <label for="pass">
                        password
                    </label>
                    <input type="password"
                        id="pass"
                        placeholder="Wirte your password" 
                        v-model="form.password">
                </div>

                <ul class="list-rest mb-0 text-center mb-3 social-media">
                    <li class="inline-block"><a href="#" @click="loginByFacebook"><i class="fab fa-facebook-f"></i></a></li>
                    <li class="inline-block"><a href="#"><i class="fab fa-twitter"></i></a></li>
                </ul>
                <router-link to="/forgetPassword" class="pb-3 text-center d-block">Forget Password</router-link>
                <button class="default_btn br-radius mt-0" @click.stop.prevent="login" type="submit">Login</button>
                <p class="text-center p-3 mb-0">If You Don't Have Account</p>
                <button class="default_btn btn2 br-radius mt-0" @click.stop.prevent="geToRegister">Register</button>
                
                <div class="spinner absolute no-background" v-if="loading">
                    <div class="loader"></div>
                </div>
            </form>
        </div>

    </div>
</template>

<script>

export default {
    data(){
        return{
            form:{
                phone_number: '',
                password: '',
            },
            handleErrors:'',
            token:JSON.parse(localStorage.getItem('restaurant_token')),
            loading:false,
            routePrevious:'',
            ifUserVerified:true
        }
    },
    watch:{

    },
    created(){
        if(JSON.parse(localStorage.getItem('restaurant_token'))){
            this.$router.push('/')
        }
    },
    methods:{
        login(){
            this.loading = true;
            this.$axios.post('/login',this.form)
            .then((res => {
                setTimeout(() => {
                    this.loading = false;
                    localStorage.setItem('restaurant_profile',JSON.stringify(res.data.data))
                })
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
                
            }))
            .catch(error => {
                this.loading = false
            })
        },
        checkVerified(res){
            localStorage.setItem('restaurant_profile',JSON.stringify(res.data.data))
            if(res.data.data.verified){
                if(JSON.parse(localStorage.getItem('router_previous')) == '/cart'){
                    this.$router.push('/checkout')
                }
                else{
                    this.$router.push('/')
                }
            }
            else if(res.data.data.phone_number){
                this.$router.push('/verify')
            }
            else{
                this.$router.push('/addPhone')
            }
        },
        loginByFacebook(){
            FB.login((response)=> {
                if (response.authResponse) {
                    let accessToken = response.authResponse.accessToken;
                    this.loading = true;
                    this.$axios.post('/login/facebook',{
                        access_token:accessToken
                    })
                    .then(res => {
                        this.loading = false;
                        localStorage.setItem('restaurant_token',JSON.stringify(res.data.token))
                        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                        this.checkVerified(res)
                    })
                    // .catch(error=> {
                    //     if(error.response){
                    //         console.log(error)
                    //     }
                    // })
                } 
                else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            });
        },
        geToRegister(){
            this.$router.push('/register')
        },
        
    }
}

</script>