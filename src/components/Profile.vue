<template>
    <div class="grid-l min-h-100">
        <h3 class="title">My Profile</h3>

        <form action="" class="form" v-if="profileInfo">
            <router-link to="/verify" class="wraning mb-3 d-block" v-if="!profileInfo.verified"> Account isn't Active </router-link>
            <div class="input">
                <label>
                    first Name
                </label>
                <input type="text" placeholder="First Name" :value="profileInfo.first_name" disabled>
            </div>
            <div class="input">
                <label>
                    Last name
                </label>
                <input type="text" placeholder="Last Name" :value="profileInfo.last_name" disabled>
            </div>
            <div class="input">
                <label>
                    phone number
                </label>
                <input type="tel" placeholder="Phone" :value="profileInfo.phone_number" disabled>
            </div>
            <div class="input">
                <label>
                    email address
                </label>
                <input type="email" placeholder="Email" :value="profileInfo.email" disabled>
            </div>

            <button class="default_btn br-radius mt-0" @click.stop.prevent="EditProfile">Edit Profile</button>
            <p class="text-center p-3 mb-0">Or</p>
            <button class="default_btn btn2 br-radius mt-0" @click.stop.prevent="logout">Logout</button>

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
            profile: JSON.parse(localStorage.getItem('restaurant_profile')),
            profileInfo: false,
            loading:false,
        }
    },
    created(){
        if(this.profile){
            this.profileInfo = this.profile;
        }
        else{
            this.profileInfo = false;
        }
        if(JSON.parse(localStorage.getItem('restaurant_token')));
        else{
            this.$router.push('/login')
        }
    },
    methods:{
        logout(){
            localStorage.removeItem('restaurant_token');
            localStorage.removeItem('restaurant_profile');
            FB.getLoginStatus(function (response) {
                if (response && response.status === 'connected') {
                    FB.logout();
                }
            });
            this.$router.push('/')
        },
        EditProfile(){
            this.$router.push('/editProfile');
        },
    }
}
</script>