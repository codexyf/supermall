<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar/>
  </div>
</template>

<script>
  import MainTabBar from 'components/content/mainTabbar/MainTabBar'
  export default {
    name: 'App',
    components: {
      MainTabBar
    }
  };
  //做rem自适应屏幕 （IPX是 23.475px == 1rem）
  (function() {
    var styleN = document.createElement("style");
    var width = document.documentElement.clientWidth / 16;
    styleN.innerHTML = "html{font-size:" + width + "px!important}";
    document.head.appendChild(styleN);
  })();
</script>

<style>
  @import 'assets/css/base.css';
</style>
