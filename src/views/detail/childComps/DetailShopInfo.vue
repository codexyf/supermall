<template>
  <div id="shop-info" v-if="Object.keys(shop).length !== 0">
    <div class="shop-name">
      <img :src="shop.logo" alt="" v-if="shop.logo">
      <span>{{shop.name}}</span>
    </div>

    <div class="score-info">
      <div class="score-left">
        <div class="score-sell">
          <div>总销量</div>
          <div>{{sellValue}}万</div>
        </div>
        <div class="score-item">
          <div>全部宝贝</div>
          <div>{{shop.goods}}</div>
        </div>
      </div>
      <div class="score-right">
        <table>
          <tr v-for="(item, index) in shop.score" :key="index">
            <td>{{item.name}}</td>
            <td :style="{color: item.isBetter ? 'red' : 'green'}">{{item.score}}</td>
            <td :style="{color: '#fff', backgroundColor: item.isBetter ? 'red' : 'green'}">{{item.isBetter ? "高" : "低"}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="come-shop">进店逛逛</div>
  </div>
</template>
<script>
  export default {
    name: "DetailShopInfo",
    props: {
      shop: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed: {
      sellValue() {
        return Math.round((this.shop.sells / 10000) * 10) / 10
      },
    },
  }
</script>
<style scoped>
  #shop-info {
    padding: 0.64rem 0.34rem;
    border-bottom: 0.128rem solid rgba(128, 128, 128, .2);
    font-size: 0.75rem;
  }

  .shop-name img {
    width: 1.7rem;
    height: 1.7rem;
    border: 0.042rem solid rgba(128, 128, 128, .5);
  }

  .shop-name span {
    margin-left: 0.34rem;
    position: relative;
    top: -0.64rem;
    font-size: 0.768rem;
  }

  .score-info {
    padding: 0 0.512rem;
    display: flex;
  }

  .score-left,
  .score-right {
    flex: 1;
  }

  .score-left {
    display: flex;
    align-items: center;
  }

  .score-left > div {
    flex: 1;
  }

  .score-sell,
  .score-item {
    text-align: center;
    font-size: 0.6rem;
  }

  .score-item {
    border-right: 0.042rem solid gray;
  }

  .score-right > table {
    margin: 0 auto;
    font-size: 0.64rem;
    border-spacing: 0.42rem;
    /* color: #fff; */
  }

  .come-shop {
    width: 6.4rem;
    height: 1.28rem;
    line-height: 1.28rem;
    text-align: center;
    border-radius: 0.42rem;
    background-color: rgba(128, 128, 128, .3);
    margin: 0 auto;
  }

</style>
