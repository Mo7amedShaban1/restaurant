<template>
    <div>
        <div class="grid-l" v-if="!empty">
            <div  v-if="!loading">
                <h3 class="title"> My orders </h3>

                <div class="orders">
                    <router-link class="order p-3" v-for="order in orders" :key="order.id" :to="{name: 'order.show', params: {order:order.id}}">
                        <div class="d-flex align-items-center justify-content-between">
                            <p class="m-0 order_id">#{{ order.id }}</p>
                            <span class="order_status">{{ order.status }}</span>
                        </div>
                        <span class="order_time d-block">15-8-2018</span>
                        <span class="order_total d-block">{{ order.total_formated }}</span>
                        <p class="m-0">
                            {{ order.information }}
                        </p>
                    </router-link>
                </div>
            </div>
            <Loading :status="loading"></Loading>
        </div>
        <div class="grid-l d-flex h-100 align-items-center" v-if="empty">
            <div class="title">There is no any orders</div>
        </div>
    </div>
</template>

<script>

import Loading from "./Loading"

export default {
    components:{
        Loading
    },
    data(){
        return{
            orders:'',
            loading: false,
            empty:false
        }
    },
    created(){
        this.getOrders();
        if(JSON.parse(localStorage.getItem('restaurant_token')));
        else{
            this.$router.push('/')
        }
    },
    methods:{
        getOrders(){
            this.loading = true
            this.$axios.get('orders/')
            .then(res => {
                if(res.data.data.length){
                    this.orders = res.data.data;
                }
                else{
                    this.empty = true
                }
                this.loading = false
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .tabs{
        margin-top:20px;
        button{
            margin-bottom:10px
        }
        @media (min-width:992px) and (max-width:1200px){
            flex-direction: column
        }
    }
    .order{
        border-bottom: 1px solid #ddd;
        color:#333;
        display: block;
        text-decoration: none;
        .order_id{
            font-weight: bold
        }
        .order_status{
            background: #ddd;
            padding: 10px 27px;
            border-radius: 25px;
            text-transform: capitalize;
        }
        .order_total{
            color: #7fabf8;
            font-weight: bold;
            font-size: 25px;
        }
    }      
</style>

