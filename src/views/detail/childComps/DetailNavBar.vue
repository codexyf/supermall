<template>
  <div>
    <nav-bar>
      <template #left>
        <div class="back" @click="backClick">
          <img src="~assets/img/common/back.svg" alt="">
        </div>
      </template>
      <template #center>
        <div class="title">
          <div v-for="(item, index) in titles"
          :key="index"
          class="title-item"
          @click="titleClick(index)"
          :class="{active: currentIndex == index}">
            {{item}}
          </div>
        </div>
      </template>
    </nav-bar>
  </div>
</template>
<script>
  import NavBar from "components/common/navbar/NavBar"

  export default {
    name: "DetailNavBar",
    components: {
      NavBar
    },
    data() {
      return {
        // title名
        titles: ['商品', '参数', '评论', '推荐'],
        // 记录被点击的title的下标
        currentIndex: 0
      }
    },
    methods: {
      // title点击事件
      titleClick(index) {
        this.currentIndex = index
        this.$emit('titleClick', index)
      },

      // 监听返回点击事件
      backClick() {
        this.$router.back()
      },

      setCurrentIndex(index) {
        this.currentIndex = index
      }
    },
  }
</script>
<style scoped>
  .back img {
    margin-top: 0.42rem;
  }

  .title {
    display: flex;
    font-size: 0.64rem;
  }

  .title-item {
    flex: 1;
  }

  .active {
    color: var(--color-high-text);
  }
</style>
