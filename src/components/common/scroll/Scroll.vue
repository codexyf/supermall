<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <!-- 使用插槽传入可滚动内容 -->
      <slot></slot>
    </div>
  </div>
</template>
<script>
  import BScroll from '@better-scroll/core'
  import PullUp from '@better-scroll/pull-up'

  export default {
    name: "Scroll",
    props: {
      // 是否监听滚动
      probeType: {
        type: Number,
        default() {
          return 0
        }
      },

      // 是否监听下拉事件
      pullUpLoad: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      // 给Better-Scroll添加上拉事件
      if(this.pullUpLoad) {
        BScroll.use(PullUp)
      }
      // 新建Better-Scroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        // 监听BS里面元件的点击事件
        click: true,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      // // 延时2s刷新BS，重新计算可滚动内容
      // setTimeout(() => {
      //   this.scroll.refresh()
      // }, 2000);
      // 监听滚动的位置
      if(this.probeType == 2 || this.probeType == 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)
        })
      }

      // 监听上拉事件
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          this.$emit('pullingUp')
          // setTimeout(() => {
          //   this.scroll.finishPullUp()
          // }, 2000);
        })
      }
    },
    methods: {
      // 调用scrollTo方法，移动内容到指定坐标
      scrollTo(x, y, time=300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      // 结束下拉事件
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp()
      },
      // 刷新BScroll
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      // 获取scroll.y
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
      
    },
  }
</script>
<style scoped>

</style>
