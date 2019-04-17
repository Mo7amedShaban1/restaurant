<template>
    <div class="grid-l d-flex h-100 align-items-center justify-content-center flex-column">
        <div class="title d-block">thank you for your order</div>
        <button class="default_btn br-radius" @click="followOrder">Show Your Orders</button>
    </div>
</template>

<script>
export default {
    methods:{
        followOrder(){
            this.$router.push('/orders')
        }
    }
}
</script>