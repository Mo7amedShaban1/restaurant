<template>
    <div class="home">
        <div class="right-side">

            <!-- Navbar -->

            <div class="navbar d-flex">
                <ul class="list-rest mb-0 navbar_desktop">
                    <router-link tag="li" to="/"><a>Home</a></router-link>
                    <router-link tag="li" to="/cart"><a>Cart</a></router-link>
                    <router-link tag="li" :to="{name: 'register'}" v-show="ifUserLogin"><a>register</a></router-link>
                    <router-link tag="li" :to="{name: 'profile'}" v-show="!ifUserLogin"><a>profile</a></router-link>
                    <router-link tag="li" to="/orders" v-show="!ifUserLogin"><a>orders</a></router-link>
                    <router-link tag="li" :to="{name:'login'}" v-show="ifUserLogin"><a>Login</a></router-link>
                </ul>
                <div class="mobile">
                    <ul class="list-rest mb-0 navbar_mobile d-none">
                        <div class="menu_mobile">
                            <button class="ml-auto" @click="closeMenu"><i class="fa fa-times"></i></button>
                        </div>
                        <img src="../assets/img/logo.png" class="logo">
                        <router-link tag="li" to="/"><a>Home</a></router-link>
                        <router-link tag="li" to="/cart"><a>Cart</a></router-link>
                        <router-link tag="li" :to="{name: 'register'}" v-show="ifUserLogin"><a>register</a></router-link>
                        <router-link tag="li" :to="{name: 'profile'}" v-show="!ifUserLogin"><a>profile</a></router-link>
                        <router-link tag="li" to="/orders" v-show="!ifUserLogin"><a>orders</a></router-link>
                        <router-link tag="li" :to="{name:'login'}" v-show="ifUserLogin"><a>Login</a></router-link>
                    </ul>
                </div>
                <button class="navbar_toggle d-none" @click="toggleMenu"><i class="fa fa-bars"></i></button>
                <ul class="list-rest ml-auto mb-0" >
                    <li><a href="#" class="uppercase">en</a></li>
                </ul>
            </div>

            <!-- Filter -->

            <div class="filter">
                <button class="filter__dropdown" @click="toggleClass">
                    <span>Select Branch</span>
                    <i class="fas" :class="{'fa-angle-up': isActive, 'fa-angle-down': !isActive}" ></i>
                </button>
                <ul class="filter__nav list-rest" :class="{ active: isActive }">
                    <li v-for="branch of allBranch" :key="branch.id" @click="toggleClass">
                        <router-link :to="{name:'branches.products.index',params:{branch: branch.id}}">{{branch.name}}</router-link>
                    </li>
                </ul>
            </div>

            <!-- Contact us -->

            <div>
                <img src="../assets/img/logo.png" class="logo">
                <div class="contact-us" v-if="hiddenBranchInfo">
                    <div class="row">
                        <div class="col-8 m-auto col-sm-6">
                            <ul class="list-rest">
                                <li><i class="fas fa-utensils"></i> {{ branchInfo.description }} </li>
                                <li><i class="far fa-star"></i> 200 review</li>
                                <li><i class="far fa-money-bill-alt"></i> $10 minimum order</li>
                            </ul>
                        </div>
                        <div class="col-8 m-auto col-sm-6">
                            <ul class="list-rest">
                                <li><i class="fas fa-map-marker-alt"></i> {{ branchInfo.address }} </li>
                                <li><i class="far fa-clock"></i> sat - fri 2:00am - 1:00am</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        
        <div class="spinner" v-if="spinnerLoding">
            <div class="loader"></div>
        </div>

    </div>
</template>

<script>

export default {
    data(){
        return{
            isActive:false,
            allBranch:'',
            branchInfo:'',
            branchProducts:'',
            currentBranchId:this.$route.params.branch,
            hiddenBranchInfo:false,
            spinnerLoding:true,
            ifUserLogin:true,
        }
    },
    created(){
        this.getAllBranch();
        if( this.$route.params.branch ){
            this.getBranchInfo();
        }else{
            this.hiddenBranchInfo = false
        }
        if(JSON.parse(localStorage.getItem('restaurant_token'))){
            this.ifUserLogin = false
        }
    },
    watch:{
        "$route.params.branch"(to,from){
            this.hiddenBranchInfo = false
            if(to){
                this.currentBranchId = this.$route.params.branch;
                this.getBranchInfo()
            }
        },
        "$route"(to,from){
            if(JSON.parse(localStorage.getItem('restaurant_token'))){
                this.ifUserLogin = false
            }
            else{
                this.ifUserLogin = true
            }
        },
    },
    methods: {
        toggleMenu(){
            document.querySelector('.mobile').classList.add('show')
            document.querySelector('.navbar_mobile').classList.add('show')
        },
        closeMenu(){
            document.querySelector('.mobile').classList.remove('show')
            document.querySelector('.navbar_mobile').classList.remove('show')
        },
        getAllBranch(){
            this.$axios.get('/branches')
            .then((response) => {
                this.spinnerLoding = false;
                return response.data.data;
            }).then((res) => {
                this.allBranch = res;
            })
        },
        getBranchInfo(){
            this.spinnerLoding = true;
            this.hiddenBranchInfo = false;
            this.$axios.get(`branches/${this.currentBranchId}`)
            .then(res => {
                this.hiddenBranchInfo = true;
                this.branchInfo = res.data.data;
                setTimeout(()=>{
                    this.spinnerLoding = false;
                },1000)
            })
            
        },
        toggleClass(e){
            this.isActive =! this.isActive;
        },
    }
}
</script>

<style lang="scss" scoped>
    @media(max-width: 568px) {
        .navbar_toggle{
            display: block!important;
            border-radius: 2px;
            border: 0;
            padding: 5px 10px;
            font-size: 15px;
            font-weight: bold;
        }
        .navbar_desktop{
            display: none
        }
        .navbar_mobile{
            display: flex!important;
        }
    }
    .mobile{
        width: 100%;
        position: fixed;
        left: 0;
        background: rgba(51, 51, 51, .5);
        bottom: 0;
        top: 0;
        z-index: 99;
        transition: all .4s ease-in;
        opacity: 0;
        visibility: hidden;
        &.show{
            opacity: 1;
            visibility:visible;
        }
    }
    
    .navbar_mobile{
        position: fixed;
        height: 100%;
        background: #333;
        left: 0;
        bottom: 0;
        z-index: 99;
        width: 250px;
        flex-direction: column;
        display: flex;
        transform: translateX(-250px);
        transition: all .3s ease-in;
        &.show{
            transform: translateX(0px);
        }
        a{
            display: block;
            text-align: center
        }
        .menu_mobile{
            display: flex;
            padding: 1rem;
            margin-bottom: 20px;
            border-bottom: 1px solid #636262;
            button{
                border-radius: 50%;
                border:0;
                width:35px;
                height: 35px;
                cursor: pointer;
                outline: none
            }
            &::after{
                content: '';

            }
        }
        img{
            width: 200px;
            margin: 0 auto;
        }
    }
</style>

