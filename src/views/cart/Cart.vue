<template>
  <div class="cart"> 
    <!-- 顶部导航栏 -->
    <cart-nav-bar/>
    <!-- 可滚动区域 -->
    <scroll class="content" ref="scroll">
      <!-- 购物车列表 -->
      <cart-list/>
    </scroll>
    <!-- 底部汇总 -->
    <cart-bottom-bar/>
  </div>
</template>
<script>
  import CartNavBar from './childComps/CartNavBar.vue'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'

  export default {
    name: "Cart",
    components: { 
      CartNavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    activated() {
      this.$refs.scroll && this.$refs.scroll.refresh()
    },
  }
</script>
<style scoped>
  .content {
    position: absolute;
    top: 1.9rem;
    bottom: 3.99rem;
    right: 0;
    left: 0;
    overflow: hidden;
  }
</style>
