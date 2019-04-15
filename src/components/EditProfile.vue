<template>
    <div class="grid-l">
        <h3 class="title">Edit Profile</h3>

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

            <button class="default_btn br-radius mt-0" @click.stop.prevent="saveEdit">Save</button>
            <p class="text-center p-3 mb-0">Or</p>
            <button class="default_btn btn2 br-radius mt-0" @click.stop.prevent="close">Close</button>

            <div class="spinner absolute no-background" v-if="loading">
                <div class="loader"></div>
            </div>

        </form>
    </div>
</template>

<script>

export default {
    data(){
        let profile = JSON.parse(localStorage.getItem('restaurant_profile'));
        return{
            form: {
                first_name:profile.first_name,
                last_name:profile.last_name,
                phone_number:profile.phone_number,
                email:profile.email,
            },
            loading:false,
        }
    },
    beforeCreate(){
        if(JSON.parse(localStorage.getItem('restaurant_token')));
        else{
            this.$router.push('/login')
        }
    },
    methods:{
        close(){
            this.$router.push('profile')
        },
        saveEdit(){
            this.loading = true,
            this.$axios.patch('/profile',this.form)
            .then((res => {
                console.log(res)
                localStorage.setItem('restaurant_profile',JSON.stringify(res.data.data))
                this.$router.push('/profile')
            }))
            .catch(error => {
                this.loading = false
            })
        }
    }
}
</script>