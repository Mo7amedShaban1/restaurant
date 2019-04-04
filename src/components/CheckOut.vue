<template>
    <div class="grid-l">
        <ul class="nav list-rest">
            <li><a @click="routerBack" style="cursor:pointer"><i class="fas fa-arrow-left"></i></a></li>
        </ul>
        <form action="" class="checkout form p-0">

            <h3 class="title small">Payment methods</h3>
            <div class="mt-2 mb-2">
                <label for="cash">
                    <input type="radio" name="payment_methods" id="cash" v-model="checkOut.payment_methods" value="Cash" >
                    Cash
                </label>
                <label for="visa">
                    <input type="radio" name="payment_methods" id="visa" v-model="checkOut.payment_methods" value="Visa" disabled>
                    Visa
                </label>
            </div>

            <h3 class="title small">Delivery info</h3>
            <div class="input">
                <input type="tel" class="br-radius mt-0 w-100" placeholder="Your phone" v-model="checkOut.phone">
            </div>
            <div class="input">
                <textarea name="" class="br-radius mt-0 w-100" placeholder="Address in details" v-model="checkOut.information"></textarea>
            </div>
            <h3 class="title small">Address</h3>
            <mapPicker @place-changed="placeChanged"></mapPicker>

            <ul class="list-rest order_information pt-4 pb-4">
            <h3 class="title small">Order information</h3>
                <li><strong>Phone : </strong> <span> {{ checkOut.phone }} </span></li>
                <li><strong>Address : </strong> <span> {{ checkOut.address }} </span></li>
                <li><strong>Payment methods : </strong> <span> {{ checkOut.payment_methods }} </span></li>
                <li><strong>Information : </strong> <span> {{ checkOut.information }} </span></li>
                <!-- <li><strong>Total price : </strong></li> -->
            </ul>
        </form>
        <button class="default_btn mt-0 fixed_bottom col-lg-5" @click="sendOrder">Send Order</button>
    </div>
</template>

<script>

import mapPicker from './MapPicker'
import { Form, HasError, AlertError } from 'vform'

export default {
    data(){
        return{
            cartProducts:JSON.parse(localStorage.getItem('restaurant_cart')),
            checkOut:{
                phone:'',
                payment_methods:'Cash',
                information:'',
                branch_id:JSON.parse(localStorage.getItem('restaurant_token')),
                address:'',
                latitude:'',
                longitude:'',
                products:[],
            }
        }
    },
    components:{
        mapPicker,
        HasError
    },
    beforeCreate(){
        if(JSON.parse(localStorage.getItem('restaurant_token')));
        else{
            this.$router.push('/')
        }
    },
    methods:{
        routerBack(){
            this.$router.go(-1);
        },
        placeChanged(location, address) {
            this.checkOut.address = address;
            this.checkOut.latitude = location.lat
            this.checkOut.longitude = location.lng
        },
        sendOrder(){
            let newArr = []
            this.cartProducts.filter(item => {
                this.checkOut.products.push({
                    product_id: item.id,
                    quantity: item.quantity,
                    options : item.options,
                    note:'',
                })
            })
            this.$axios.post('/checkout')
            .then(res => {
                console.log(res)
            })
            .catch(error => {
                if(error.response){
                    if(error.response.status == 401){
                        localStorage.removeItem('restaurant_token')
                        this.$router.push('/login')
                    }
                }
                else{
                    console.log(error)
                }
            })
        }
    }
}
</script>

<style>

</style>
