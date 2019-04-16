<template>
    <div class="grid-l d-flex h-100 justify-content-center flex-column">
        <i class="fas fa-sms icon"></i>
        <p class="text-center p-3 mb-0">Add Your Phone and We Will Send The Activation Code </p>
        <div class="input">
            <input v-model="form.phone_number" placeholder="Write your phone number" class="text-center">
        </div>
        <button class="default_btn br-radius mt-0" @click="updatePhone">Add</button>
        <p class="text-center p-3 mb-0">Or</p>
        <button class="default_btn btn2 br-radius mt-0">Add Later</button>
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
                phone_number: '',
            },
            loading:false,
        }
    },
    methods:{
        updatePhone(){
            this.loading = true,
            this.$axios.patch('/profile',this.form)
            .then((res => {
                localStorage.setItem('restaurant_profile',JSON.stringify(res.data.data))
                this.loading = false,
                this.$router.push('/verify')
            }))
            .catch(error => {
                this.loading = false
            })
        }
    }
}
</script>