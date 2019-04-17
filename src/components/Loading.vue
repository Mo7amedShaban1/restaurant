<template>
    <div class="grid-l min-h-100" v-if="status">
        <div class="spinner inherit">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    props:['status']
}
</script>