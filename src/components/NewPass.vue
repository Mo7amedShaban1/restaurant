<template>
    <div class="grid-l d-flex h-100 justify-content-center flex-column">
        <i class="fas fa-unlock icon"></i>
        <p class="text-center p-3 mb-0 capitalize">Wirte the new password for your account</p>
        <form>

            <div class="input">
                <input  type="password" 
                        v-model="newPass.password" 
                        placeholder="Write new password" 
                        class="text-center">
            </div>

            <div class="input">
                <input  type="password" 
                        v-model="newPass.password_confirmation" 
                        placeholder="Confirm the password" 
                        class="text-center">
            </div>
        
            <button class="default_btn btn2 br-radius mt-0" @click.stop.prevent="newPassword">Save</button>
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
            newPass:{
                token:'',
                password:'',
                password_confirmation:''
            },
            loading:false
        }
    },
    props:['token'],
    created(){
        if(this.token.length){
            this.newPass.token = this.token;
        }else{
            this.$router.push('/')
        }
    },
    methods:{
        newPassword(){
            this.loading = true;
            this.$axios.post('/password/reset',this.newPass)
            .then(res => {
                this.$router.push('/login')
            })
            .catch(error => {
                this.loading = false;
                if(error.status == 401){
                    this.$router.push('/forgetPassword')
                }
            })
        }
    }
}
</script>

<style>

</style>
