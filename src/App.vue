<template>
  <div id="app">
    <div class="container-fluid p-0">
      <!-- <div class="loading" v-if="loading" style="width:0%"></div> -->
      <div class="row">
        <div class="col-lg-5 p-0 scroll-bar reverse-mobile">
          <div class="notify warning">Your already added products from another branch Go to cart and check out these products first or delete it</div>
          <div class="notify-internet warning">no connection to the internet</div>
          <div class="notify success">done! You added this product to the cart</div>
          <transition  name="fade">
            <router-view></router-view>
          </transition>
        </div>
        <div class="col-lg-7 p-0">
          <home></home>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import home from './components/Home';

export default {
  data(){
    return{
    }
  },
  name: 'app',
  components:{
    home,
  },
  computed:{

  },
}
</script>

<style lang="scss">
  .container-fluid{
    overflow: hidden;
  }
 .fade-enter-active {
  transition: all .3s ease;
}
.fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.fade-enter, .fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}
</style>
