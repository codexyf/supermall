import {debounce} from "../utils/utils.js"
import BackTop from 'components/content/backTop/BackTop'

export const itemListenerMixin = {
  data() {
    return {
      //  保存全局函数
      itemImgListener: null,
    }
  },
  mounted() {
    const refresh = debounce(this.$refs.scroll.refresh, 200)
    this.itemImgListener = () => {
      refresh()
    } 
    this.$bus.$on('itemImageLoad', this.itemImgListener)
  },
}

export const backTopMixin = {
  data() {
    return {
      // 是否显示上拉加载更多图标
      isShowBackTop: false,
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 回到顶部
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 500)
    },
    listenShowBackTop(position) {
      // 判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
    }
  },
}