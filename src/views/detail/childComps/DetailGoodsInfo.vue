<template>
  <div id="detail-goods-info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="goods-info-desc">
      <div class="desc-line-left">
        <i class="desc-dot-left"></i>
      </div>
      <div class="desc-text">
        {{detailInfo.desc}}
      </div>
      <div class="desc-line-right">
        <i class="desc-dot-right"></i>
      </div>
    </div>
    <div class="goods-info-key">
      {{detailInfo.detailImage[0].key}}
    </div>
    <div class="goods-info-imgs">
      <img :src="item" alt=""
      v-for="(item, index) in detailInfo.detailImage[0].list"
      :key="index"
      @load="goodsInfoLoad">
    </div>
  </div>
</template>
<script>
  export default {
    name: "DetailGoddsInfo",
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        counter: 0,
        imagesLength: 0
      }
    },
    methods: {
      goodsInfoLoad() {
        // 只发送最后一次图片加载完成的信号
        ++this.counter === this.imagesLength && this.$emit("goodsInfoLoad")
      }
    },
    watch: {
      // 观察detialInfo的变化
      detailInfo() {
        // j计算图片的个数
        this.imagesLength = this.detailInfo.detailImage[0].list.length
      }
    },
  }
</script>
<style scoped>
  #detail-goods-info {
    font-size: 0.68rem;
  }

  .goods-info-desc {
    font-size: 0.6rem;
    padding: 0.42rem 0.34rem;
  }

  .desc-line-left,
  .desc-line-right {
    width: 3.5rem;
    height: 0.04rem;
    background-color: gray;
    position: relative;
  }

  .desc-line-left {
    float: left;
  }
  
  .desc-line-right {
    float: right;
  }

  .desc-dot-left,
  .desc-dot-right {
    position: absolute;
    top: -0.1rem;
    display: inline-block;
    width: 0.21rem;
    height: 0.21rem;
    background-color: black;
    border-radius: 50%;
  }

  .desc-dot-right {
    right: 0;
  }

  .desc-text {
    padding: 0.85rem 0;
    color: gray;
  }

  .goods-info-keys {
    padding: 0.42rem 0.34rem;
  }

  .goods-info-imgs img {
    width: 100%;
  }
</style>
