<template>
    <div class="grid-l">
        <list-of-product></list-of-product>
    </div>
</template>

<script>
import listOfProduct from "./ListOfProduct";

export default {
    methods:{
    },
    components:{
        listOfProduct
    },
}
</script>

<style scoped>
    .title{
        margin-bottom: 35px;
        font-size: 40px;
        text-align: center
    }
</style>
