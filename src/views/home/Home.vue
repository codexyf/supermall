<template>
  <div id="home">
    <!-- 顶部 -->
    <nav-bar class="home-nav">
      <template #center>购物街</template>
    </nav-bar>
    <tab-control :titles="titles"
    @tabClick="tabClick"
    ref="tabControl1"
    class="tab-control"
    v-show="isTabFixed"/>
    <scroll class="content" ref="scroll"
    :probe-type="3"
    :pull-up-load="true"
    @scroll="contentScroll"
    @pullingUp="loadMore">
      <!-- 轮播图  -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"/>
      <!-- 专区 -->
      <recommend-view :recommends="recommends"/>
      <!-- 本周流行 -->
      <feature-view/>
      <!-- 流行、新款、精选导航栏 -->
      <tab-control :titles="titles"
      @tabClick="tabClick"
      ref="tabControl2"/>
      <!-- 商品展示 -->
      <goods-list :goods="showGoods"/>
    </scroll>
    <!-- 回到顶部 -->
    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>
<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import { getHomeMultidata,
  getHomeGoods
  } from 'network/home.js'

  // import {debounce} from 'common/utils/utils.js'
  import {itemListenerMixin, backTopMixin} from "common/mixin/mixin.js"

  export default {
    name: "Home",
    data() {
      return {
        // 轮播图数据
        banners: [],
        // 专区数据
        recommends: [],
        // 商品分类导航栏
        titles: ['流行', '新款', '精选'],
        // 商品数据
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []}
        },
        // 当前展示商品分类
        currentType: 'pop',
        // 商品导航栏位置
        tabOffsetTop: 0,
        // tabControl是否吸顶
        isTabFixed: false,
        // 记录离开Home时的位置
        saveY: 0,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
    },
    created() {
      // 对接收到的HomeMultidata数据进行处理
      this.getHomeMultidata()

      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {

      // 获取tabControl的offsetTop值
      // this.tabOffsetTop = this.$refs.tabControl
      // console.log(this.$refs.tabControl.$el.offsetTop);
    },
    computed: {
      // 展示商品数据
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0)
      this.$refs.scroll.refresh()
    },
    deactivated() {
      // 保存Y值
      this.saveY = this.$refs.scroll.getScrollY()
      // 取消全局事件的监听
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    methods: {
      /***
       * 事件监听相关的方法
       */
      // 点击商品分类，切换展示的商品
      tabClick(index) {
        // switch (index) {
        //   case 0:
        //     this.currentType = 'pop'
        //     break
        //   case 1:
        //     this.currentType = 'new'
        //     break
        //   case 2:
        //     this.currentType = 'sell'
        //     break
        // }
        this.currentType = Object.keys(this.goods)[index]
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },

      contentScroll(position) {
        // 判断BackTop是否显示
        this.listenShowBackTop(position)

        // 决定tabCOntrol是否吸顶
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },

      // 监听下拉加载更多
      loadMore() {
        this.getHomeGoods(this.currentType)
        this.$refs.scroll.finishPullUp()
      },

      // 轮播图图片加载完成
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },

      /***
       * 网络请求相关的方法
       */
      // 广告区数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommends = res.data.recommend.list
        })
      },

      // 商品数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        })
      }
    },
  }
</script>
<style scoped>
  #home {
    /* 有了BS之后，可以不用 */
    /* padding-top: 1.9rem; */
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* 原生滚动需要下面的样式，BS不用
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  /* 有了BS失效
  .tab-control {
    position: sticky;
    top: 1.9rem;
  } */

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 1.9rem;
    bottom: 2.09rem;
    overflow: hidden;
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

</style>
