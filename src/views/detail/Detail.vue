<template>
  <div id="detail">
    <!-- 顶部导航栏 -->
    <detail-nav-bar
    class="detail-nav"
    @titleClick="titleClick"
    ref="navBar"/>
    <!-- 可滚动区域 -->
    <scroll class="content" ref="scroll"
    :probeType="3"
    @scroll="contentScroll">
      <!-- 轮播图 -->
      <detail-swiper :topImages="topImages"/>
      <!-- 商品信息 -->
      <detail-base-info :goods="goods"/>
      <!-- 店铺信息 -->
      <detail-shop-info :shop="shop"/>
      <!-- 展示信息 -->
      <detail-goods-info :detailInfo="detailInfo" @goodsInfoLoad="goodsInfoLoad"/>
      <!-- 参数信息 -->
      <detail-param-info :paramInfo="paramInfo" ref="params"/>
      <!-- 评论信息 -->
      <detail-comment-info :commentInfo="commentInfo" ref="comment"/>
      <!-- 推荐信息 -->
      <goods-list :goods="recommends" ref="recommend"/>
      <!-- 回到顶部 -->
    </scroll>
    <!-- 底部组件 -->
    <detail-bottom-bar @addCart="addToCart"/>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>
<script>
  import DetailNavBar from "./childComps/DetailNavBar"
  import DetailSwiper from "./childComps/DetailSwiper"
  import DetailBaseInfo from "./childComps/DetailBaseInfo"
  import DetailShopInfo from "./childComps/DetailShopInfo"
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo"
  import DetailParamInfo from "./childComps/DetailParamInfo"
  import DetailCommentInfo from "./childComps/DetailCommentInfo"
  import DetailBottomBar from "./childComps/DetailBottomBar"

  import Scroll from "components/common/scroll/Scroll"
  import GoodsList from "components/content/goods/GoodsList"

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail.js"

  // import {debounce} from "common/utils/utils.js"
  import {itemListenerMixin, backTopMixin} from "common/mixin/mixin.js"

  import {ADD_CART} from "store/mutation.types.js"
  import {mapActions} from "vuex"

  export default {
    name: "Detail",
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      Scroll,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      DetailBottomBar,
    },
    data() {
      return {
        // 商品iid
        iid: null,
        // 顶部轮播图
        topImages: [],
        // 商品信息
        goods: {},
        // 店铺信息
        shop: {},
        // 顶部状态栏刷新函数
        // refresh: null,
        // 展示信息
        detailInfo: {},
        // 参数信息
        paramInfo: {},
        // 评论信息
        commentInfo: {},
        // 推荐数据
        recommends: [],
        // 主题所在y值
        themeTopYs: [],
        // 记录下标值
        currentIndex: 0,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      // 从路由中获取商品iid
      this.iid = this.$route.params.iid
      // 请求数据
      getDetail(this.iid).then(res => {
        const data = res.result
        this.topImages = data.itemInfo.topImages
        // 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        // 创建店铺信息
        // console.log(data);
        this.shop = new Shop(data.shopInfo)
        // 商品展示数据
        this.detailInfo = data.detailInfo
        // 获取参数的信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        // 取出评论信息
        if(data.rate.cRate !== 0) {
          this.commentInfo = data.rate.list[0]
        }
        // this.$nextTick(() => {
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
        //   console.log(this.themeTopYs);
        // })
      })

      getRecommend().then(res => {
        this.recommends = res.data.list
      })
    },
    mounted() {
      // this.refresh = debounce(this.$refs.scroll.refresh, 200)
     
    },
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      ...mapActions({
        add: ADD_CART
      }),
      goodsInfoLoad() {
        // this.refresh()
        // 图片加载完成，刷新一次
        this.$refs.scroll.refresh()
        // 记录顶部导航栏的长度，位移偏移量
        const scrollTop = this.$refs.scroll.$el.offsetTop
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - scrollTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - scrollTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - scrollTop)
        // 设置一个值，用空间换时间
        this.themeTopYs.push(Infinity)
      },

      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 500)
      },

      contentScroll(position) {
        // 判断BackTop是否显示
        this.listenShowBackTop(position)
        // 标签跟随滚动变化
        const positonY = -position.y
        const length = this.themeTopYs.length
        for (let index = 0; index < length - 1; index++) {
          if ((this.currentIndex !== index) &&
          (this.themeTopYs[index] <= positonY && this.themeTopYs[parseInt(index) + 1] > positonY)) {
            this.currentIndex = index
            this.$refs.navBar.setCurrentIndex(this.currentIndex)
          }
        }
      },

      addToCart() {
        // 获取购物车需要展示的东西
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.realPrice
        product.iid = this.iid
        product.count = 1

        // this.$store.dispatch(ADD_CART, product).then(res => {
        //   console.log(res);
        // })
        this.add(product).then(res => {
          this.$toast.show()
        })
      }
    },
  }
</script>
<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100% - 1.9rem - 2.09rem);
    overflow: hidden;
    /* position: absolute;
    top: 1.9rem;
    bottom: 2.09rem;
    left: 0;
    right: 0;
    overflow: hidden; */
  }
</style>
