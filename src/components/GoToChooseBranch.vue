<template>
    <div class="grid-l d-flex h-100 align-items-center">
        <div class="title">Go to the next side and choose the branch</div>
    </div>
</template>

<script>
export default {
    beforeCreate(){
        let branch = JSON.parse(localStorage.getItem('current_branchId'));
        if(branch){
            this.$router.push(`/branches/${branch}/products`)
        }
    }
}
</script>

<style scoped>
    @media(max-width: 992px){
        .grid-l{
            display: none!important
        }
    }
</style>
