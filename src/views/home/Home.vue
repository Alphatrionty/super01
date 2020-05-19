<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <FeatureView></FeatureView>
      <tab-control :titles="['流行', '新款', '精选']"
                   @tabClick="tabClick"
                   ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>

<!--    native 监听组件的点击-->
    <back-top @click.native="backClick" v-show="isshowBackTop"></back-top>

  </div>
</template>

<script>

  import HomeSwiper from "./childComps/HomeSwiper";
  import RecommendView from "./childComps/RecommendView";
  import FeatureView from "./childComps/FeatureView";

  import NavBar from "../../components/common/navbar/NavBar";
  import TabControl from "../../components/content/tabControl/TabControl";
  import GoodsList from "../../components/content/goods/GoodsList";
  import Scroll from "../../components/common/scroll/Scroll";
  import BackTop from "../../components/content/backTop/BackTop";

  import {getHomeMultidata, getHomeGoods} from "../../network/home";
  import {debounce} from "../../common/utils";


  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        //决定返回按钮的显示和隐藏
        isshowBackTop: false,
        //吸顶效果，拿到属性
        tabOffsetTop: 0,
        // isTabFxid: false,
        // itemImageListener: null,
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
    //  1 请求多个数据
      this.getHomeMultidata()

    //  2 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')


    },
    mounted() {
      //1 图片加载完的事件监听
      const refresh = debounce(this.$refs.scroll.refresh, 50)
      //   监听item中图片加载完成
      this.$bus.$on('itemImageLoad', () => {
        // this.$refs.scroll.refresh()
        // console.log('---');
        refresh()
      })

      //  2 吸顶效果，赋值,获取tabControl的offsetTop
      // 所有组件都有一个属性$el 用于获取组件中的属性
      this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
    },
    methods: {
      /**
      *事件监听相关的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break
          case 1:
            this.currentType = 'new'
            break
          case 2:
            this.currentType = 'sell'
            break
        }
      },
      backClick() {
        //第三个传入毫秒，回到顶部的时间
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      contentScroll(position) {
        //返回顶部按钮的隐藏和显示
        this.isshowBackTop = -position.y > 1000
      },
      loadMore() {
        // console.log('加载更多');
        this.getHomeGoods(this.currentType)
      },
      /**
       *网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          // console.log(res.data.banner.list);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page =this.goods[type].page + 1
        getHomeGoods(type,page).then(res => {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

        //  完成上拉加载更多,调用下次加载，刷新scroll高度
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/

    /*viewport height 视高*/
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }

  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }

</style>
