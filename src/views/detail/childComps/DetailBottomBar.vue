<template>
  <div class="bottom-bar">
    <div class="bottom-left">
      <div class="service">
        <i class="icon"></i>
        <span>客服</span>
      </div>
      <div class="shop">
        <i class="icon"></i>
        <span>店铺</span>
      </div>
      <div class="collect">
        <i class="icon"></i>
        <span>收藏</span>
      </div>
    </div>
    <div class="bottom-right">
      <div class="cart" @click="addToCart">
        加入购物车
      </div>
      <div class="buy">
        购买
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "DetailButtomBar",
    methods: {
      addToCart() {
        this.$emit("addCart")
      }
    },
  }
</script>
<style scoped>
  .bottom-bar {
    height: 2.09rem;
    font-size: 0.65rem;
    display: flex;
    position: fixed;
    background-color: #fff;
    bottom: 0;
    left: 0;
    right: 0;
    text-align: center;
    box-shadow: 0 --0.04rem 0.4rem gray;
  }

  .bottom-left {
    display: flex;
    flex: 1;
  }

  .bottom-left > div {
    flex: 1;
    border-right: 0.04rem solid rgba(128, 128, 128, .2);
  }

  .bottom-left .icon {
    display: block;
    background: url("~assets/img/detail/detail_bottom.png") 0 0/100%;
    width: 1rem;
    height: 1rem;
    margin: 0.12rem auto;
  }

  .service .icon {
    background-position: 0 -2.4rem;
  }

  .shop .icon {
    background-position: 0 -4.5rem;
  }

  .bottom-right {
    display: flex;
    flex: 1;
  }

  .bottom-right > div {
    flex: 1;
    line-height: 2.09rem;
  }

  .cart {
    background-color: rgb(255, 174, 0);
  }

  .buy {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>
