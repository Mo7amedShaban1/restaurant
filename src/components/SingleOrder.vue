<template>
    <div class="grid-l">
        <div  v-if="!loading">
            <h3 class="title"> Single Order </h3>

            <div class="order">
                <div class="status">
                    <div class="state accepted active">
                        <span class="state_date">15-8-2018</span>
                        <p class="m-0">Order accepted</p>
                    </div>
                    <div class="state accepted active">
                        <span class="state_date">15-8-2018</span>
                        <p class="m-0">Starting make your order</p>
                    </div>
                    <div class="state accepted">
                        Delivery will coming
                    </div>
                </div>
                <div class="order_details">
                    <h3 class="">Order Details</h3>
                    <p>Total : <span>{{ order.sub_total_formated }}</span></p>
                    <p>Address : <span>{{ order.address }}</span></p>
                    <p>Status : <span>{{ order.status }}</span></p>
                    <p>Phone : <span>{{ order.phone }}</span></p>
                    <p>Branch name : <span>{{ order.branch.name }}</span></p>
                </div>
            </div>
            <button class="default_btn br-radius mt-4">Show Map</button>
        </div>
        <div class="spinner absolute no-background" v-if="loading">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            order:'',
            loading:false
        }
    },
    created(){
        this.getOrderDetails();
    },
    methods:{
        getOrderDetails(){
            this.loading = true;
            const currentOrderId = this.$route.params.order;
            this.$axios(`orders/${currentOrderId}`)
            .then(res => {
                this.loading = false;
                console.log(res)
                this.order = res.data.data
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .status{
        margin-top: 40px;
        .state{
            color:#909090;
            position: relative;
            padding-left: 40px;
            padding-bottom: 40px;
            &::before{
                content: "";
                position: absolute;
                left: 0;
                background: #ddd;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                z-index:9
            }
            &::after{
                content: "";
                position: absolute;
                left: 0;
                background: #ddd;
                width: 3px;
                top: 0;
                bottom: 0;
                left: 14px;
            }
            &:last-child::after{
                bottom: 40px;
            }
            &.active{
                p{
                    color:#000;
                }
                &::before{
                    content: "";
                    background: #7fabf8;
                }
            }
        }
    }
    .order_details{
        p{
            font-weight: bold;
            margin-bottom:5px;
            text-transform:capitalize
        }
        span{
            font-weight: normal
        }
    }
</style>
