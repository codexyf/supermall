<template>
  <div>
    <swiper>
      <!-- 遍历展示轮播图 -->
      <swiper-item :key="index" v-for="(item, index) in banners">
        <!-- <a :href="item.link"> -->
          <img :src="item.image" alt="" @load="imageLoad">
        <!-- </a> -->
      </swiper-item>
    </swiper>
  </div>
</template>
<script>
  import {Swiper, SwiperItem} from 'components/common/swiper/index.js'
  
  export default {
    name: "HomeSwiper",
    props: {
      banners: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        isLoad: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imageLoad() {
        if(!this.isLoad) {
          this.isLoad = true
          this.$emit('swiperImageLoad')
        }
      }
    },
  }
</script>
<style scoped>

</style>
