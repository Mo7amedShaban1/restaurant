<template>
    <div class="grid-l d-flex h-100 justify-content-center flex-column">
        <i class="fas fa-envelope icon"></i>
        <p class="text-center p-3 mb-0">We Sent a Message, Check Your Phone Please</p>
        <div class="input">
            <input v-model="form.code" placeholder="Write the activation code" class=" text-center">
        </div>

        <button class="default_btn br-radius mt-0" @click="activation">Send</button>
        <p class="text-center p-3 mb-0">Or</p>
        <button class="default_btn btn2 br-radius mt-0" @click="sendCode">Resend</button>

        <div class="spinner absolute no-background" v-if="loading">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>


export default {
    data(){
        return{
            form:{
                code: '',
                phone_number:'',
            },
            loading:false,
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem('restaurant_token'))){
            if(JSON.parse(localStorage.getItem('restaurant_profile')).verified){
                this.$router.push('/')
            }
        }
        else{
            this.$router.push('/login')
        }
        this.sendCode()
    },
    methods:{
        activation(){
            this.loading = true;
            this.form.phone_number = JSON.parse(localStorage.getItem('restaurant_profile')).phone_number;
            this.$axios.post('/auth/mobile-activation',this.form)
            .then(res => {
                this.loading = false;
                document.querySelector('.notify.success').classList.add('active');
                document.querySelector('.notify.success').innerHTML = "Success! your phone is activated";
                setTimeout(() => {
                    document.querySelector('.notify.success').classList.remove('active');
                },3000)
                localStorage.setItem('restaurant_profile',JSON.stringify(res.data.data))
                this.$router.push('/')
            })
            .catch(error => {
                this.loading = false
            })
        },
        sendCode(){
            this.loading = true;
            this.form.phone_number = JSON.parse(localStorage.getItem('restaurant_profile')).phone_number;
            this.$axios.post('/auth/resend-code',{
                phone_number:this.form.phone_number
            })
            .then(res => {
                this.loading = false;
                document.querySelector('.notify.success').classList.add('active');
                document.querySelector('.notify.success').innerHTML = "Check your phone please";
                setTimeout(() => {
                    document.querySelector('.notify.success').classList.remove('active');
                },3000)
            })
            .catch(error => {
                this.loading = false
            })
        }
    }
}
</script>

<style>

</style>
