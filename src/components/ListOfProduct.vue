<template>
    <div>
        <div class="product" v-if="hiddenAllProduct">
            <h3 class="title">select item</h3>
            <div class="product__dropdown" v-for="(product) in branchProducts" :key="product.id">
                <button class="dropdown__toggle" @click="toggleClass">
                    <span><i class="fas fa-hamburger"></i> {{ product.name }}</span>
                    <i class="fas fa-angle-down" ></i>
                </button>
                <router-link v-for="info in product.products" :to="{name: 'products.show', params: {branch: $route.params.branch, product: info.id }}" class="dropdown__nav" :key="info.id">
                    <div class="nav-product w-100">
                        <img :src="info.media.image.url" alt="">
                        <h4> {{ info.name }} </h4>
                        <span class="price">${{ info.price }}</span>
                    </div>
                </router-link>
            </div>
        </div>
        <Loading :status="!hiddenAllProduct"></Loading>
    </div>
</template>
<script>

import Loading from './Loading'

export default {
    components:{
        Loading
    },
    data(){
        return{
            branchProducts:'',
            currentBranchId:this.$route.params.branch,
            hiddenAllProduct:false
        }
    },
    created(){
        this.getBranchProduct()
    },
    watch:{
        "$route.params.branch"(to,from){
            this.currentBranchId = this.$route.params.branch;
            this.getBranchProduct()
        },
    },
    updated(){
        document.querySelector('.product .product__dropdown').classList.add('show');
    },
    methods: {
        getBranchProduct(){
            this.hiddenAllProduct = false;
            this.$axios.get(`categories_with_products?branch_id=${this.currentBranchId}`)
            .then(res => {
                this.hiddenAllProduct = true;
                this.branchProducts = res.data.data;
            })
        },
        toggleClass(e){
            if(e.target.children[1].classList.contains('fa-angle-down')){
                e.target.children[1].classList.remove('fa-angle-down')
                e.target.children[1].classList.add('fa-angle-up')
                e.target.parentNode.classList.add('show')
            }else{
                e.target.children[1].classList.add('fa-angle-down')
                e.target.children[1].classList.remove('fa-angle-up')
                e.target.parentNode.classList.remove('show')
            }
        }
    }
}
</script>
