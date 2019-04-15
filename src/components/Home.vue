<template>
    <div class="home">
        <div class="right-side">

            <!-- Navbar -->

            <div class="navbar d-flex">
                <ul class="list-rest mb-0">
                    <router-link tag="li" to="/"><a>Home</a></router-link>
                    <router-link tag="li" to="/cart"><a>Cart</a></router-link>
                    <router-link tag="li" :to="{name: 'register'}" v-show="ifUserLogin"><a>register</a></router-link>
                    <router-link tag="li" :to="{name: 'profile'}" v-show="!ifUserLogin"><a>profile</a></router-link>
                    <router-link tag="li" to="/orders" v-show="!ifUserLogin"><a>orders</a></router-link>
                </ul>
                <ul class="list-rest ml-auto mb-0">
                    <router-link tag="li" :to="{name:'login'}" v-show="ifUserLogin"><a>Login</a></router-link>
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
        }
    },
    methods: {

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

