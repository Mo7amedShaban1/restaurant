<template>
  <div id="app">
    <div class="container-fluid p-0">
      <!-- <div class="loading" v-if="loading" style="width:0%"></div> -->
      <div class="row">
        <div class="col-lg-5 p-0 scroll-bar reverse-mobile">
          <div class="notify warning"></div>
          <div class="notify success"></div>
          <transition  name="fade">
            <router-view :token = "setToken" ></router-view>
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
      setToken : ''
    }
  },
  name: 'app',
  components:{
    home,
  },
  created(){
    EventBus.$on('token', token => {
        this.setToken = token
    });
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
