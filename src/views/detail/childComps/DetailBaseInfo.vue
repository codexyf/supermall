<template>
  <!-- 判断对象是否为空 -->
  <div class="base-info" v-if="Object.keys(goods).length !== 0">
    <!-- 标题 -->
    <div class="info-title">{{goods.title}}</div>
    <!-- 价钱 -->
    <div class="info-price">
      <span class="n-price">{{goods.newPrice}}</span>
      <span class="o-price">{{goods.oldPrice}}</span>
      <!-- 活动 -->
      <span
      :style="{backgroundColor: goods.discountBgColor}"
      class="discount"
      v-if="goods.discount">
        {{goods.discount}}
      </span>
    </div>
    <!-- 其他 -->
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span
      class="info-services-item"
      v-for="index in goods.services.length - 1"
      v-if="goods.services[index - 1].icon"
      :key="index">
        <img :src="goods.services[index - 1].icon" alt="">
        <span>{{goods.services[index - 1].name}}</span>
      </span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "DetailBaseInfo",
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    },
  }
</script>
<style scoped>
  .base-info {
    padding: 0.42rem;
  }

  .info-title {
    font-size: 0.768rem;
  }

  .info-price {
    margin: 0.42rem 0;
  }

  .n-price {
    font-size: 0.85rem;
    color: var(--color-high-text);
  }

  .o-price {
    margin: 0 0.21rem;
    font-size: 0.512rem;
    color: gray;
  }

  .discount {
    color: #fff;
    font-size: 0.6rem;
    padding: 0.128rem;
    border-radius: 0.21rem;
    position: relative;
    top: -0.21rem;
  }
  
  .info-other {
    display: flex;
    justify-content: space-between;
    padding-bottom: 0.42rem;
    border-bottom: 0.042rem solid rgba(128, 128, 128, .3);

    font-size: 0.6rem;
    color: gray;
  }

  .info-services {
    display: flex;
    font-size: 0.6rem;
    justify-content: space-between;
    padding: 0.85rem 0;
    border-bottom: 0.128rem solid rgba(128, 128, 128, .3);
  }

  .info-services-item img {
    width: 0.512rem;
  }

</style>
