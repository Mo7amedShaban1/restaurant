<template>
    <div>
        <div class="grid-l d-flex flex-column" v-if="isCartEmpty">
            <ul class="nav list-rest">
                <li><a @click="routerBack" style="cursor:pointer"><i class="fas fa-arrow-left"></i></a></li>
            </ul>
            <div class="cart d-flex">
                <a href="#" class="dropdown__nav" v-for="(item,index) in cartItems" :key="index">
                    <div class="nav-product w-100">
                        <img :src="item.image" alt="">
                        <div class="quantity_name">
                            <h4> {{ item.name }} </h4>
                            <p> quantity : <span>{{ item.quantity }}</span> </p>
                        </div> 
                        <span class="price">${{ item.quantity * item.price }}</span>
                        <button class="delete_product" @click.stop.prevent="deleteItem(index)"><i class="fas fa-times"></i></button>
                    </div>
                </a>
            </div>
            <div class="mt-0">
                <div class="cartInfo">
                    <h4 class="mb-0">Total</h4>
                    <span class="price"> $ {{ calcTotal() }} </span>
                </div>
                <button class="default_btn mt-4 br-radius" @click="goToCheckOut">Check out</button>
            </div>
        </div>
        <div class="grid-l d-flex h-100 align-items-center flex-column justify-content-center" v-if="! isCartEmpty">
            <div class="title">The Cart is empty go to shopping</div>
            <button class="default_btn br-radius" @click="goToAddProduct">Go to add product</button>
        </div>

    </div>
</template>

<script>

export default {
    data(){
        return{
            isCartEmpty : false,
            cartItems:JSON.parse(localStorage.getItem('restaurant_cart')),
        }
    },
    created(){
        this.cartLength()
    },
    watch:{

    },
    methods:{
        goToAddProduct(){
            this.$router.push('/')
        },
        routerBack(){
            this.$router.go(-1)
        },
        cartLength(){
            this.cartItems = JSON.parse(localStorage.getItem('restaurant_cart'))
        },
        calcTotal(){
            return JSON.parse(localStorage.getItem('restaurant_cart')).reduce((accumlator,current) => { return accumlator + (current.price * current.quantity) },0)
        },
        deleteItem(index){       
            this.cartItems.splice(index,1)
            localStorage.setItem('restaurant_cart',JSON.stringify(this.cartItems))
            if(this.cartItems){
                if(this.cartItems.length < 1){
                    localStorage.removeItem('storeBranchCartId')
                    localStorage.removeItem('restaurant_cart')
                    this.isCartEmpty = false
                }else{
                    this.isCartEmpty = true
                }
            }
        },
        cartLength(){
            if(this.cartItems){
                if(this.cartItems.length < 1){
                    this.isCartEmpty = false
                }else{
                    this.isCartEmpty = true
                }
            }
        },
        goToCheckOut(){
            if(localStorage.getItem('restaurant_token')){
                this.$router.push('checkout')
            }else{
                this.$router.push('/login')
            }
        }
    },
    watch:{

    },
}
</script>
