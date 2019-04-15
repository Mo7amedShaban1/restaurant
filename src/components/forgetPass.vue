<template>
    <div class="grid-l d-flex h-100 justify-content-center flex-column">
        <i class="fas fa-envelope icon"></i>
        <form>
            <div class="input" v-if="!hidden">
                <p class="text-center p-3 mb-0 capitalize">Wirte your phone number and we will send to you the code for rest password</p>
                <input v-model="phone_number" placeholder="Write your phone" class=" text-center">
            </div>
            <div class="input"  v-if="hidden">
                <p class="text-center p-3 mb-0 capitalize">check your phone please</p>
                <input v-model="code" placeholder="Write the code" class=" text-center">
            </div>

            <button class="default_btn br-radius mt-0" @click.stop.prevent="forget" v-if="!hidden">Send</button>
            <button class="default_btn br-radius mt-0" @click.stop.prevent="checkCodeVaild" v-if="hidden">Send</button>
            <p class="text-center p-3 mb-0">Or</p>
            <button class="default_btn btn2 br-radius mt-0" v-if="!hidden" @click.stop.prevent="close">Close</button>
            <button class="default_btn btn2 br-radius mt-0" @click.stop.prevent="forget" v-if="hidden">Resend</button>
        </form>
        <div class="spinner absolute no-background" v-if="loading">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            phone_number:'',
            loading:false,
            code:'',
            hidden:false
        }
    },
    created(){
        if(JSON.parse(localStorage.getItem('restaurant_token'))){
            this.$router.go(-1)
        }
    },
    methods:{
        forget(){
            this.loading = true
            this.$axios.post('/password/forget',{
                phone_number:this.phone_number
            })
            .then(res =>{
                this.loading = false;
                this.hidden = true
            })
            .catch(error => {
                this.loading = false
            })
        },
        checkCodeVaild(){
            this.loading = true;
            this.$axios.post('/password/check-code',{
                phone_number:this.phone_number,
                code:this.code
            })
            .then(res => {
                EventBus.$emit('token', res.data.token);
                this.$router.push('/newPass')
            })
            .catch(error => {
                this.loading = false
                console.log(error)
            })
            
        },
        close(){
            this.$router.go(-1)
        }
    }
}
</script>

<style>

</style>
