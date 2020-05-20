<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"></detail-nav-bar>
    <Scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo"
                         @imageLoad="imageLoad"></detail-goods-info>

      <detail-param-info ref="params" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>

      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </Scroll>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import DetailSwiper from "./childComps/DetailSwiper";
  import DetailBaseInfo from "./childComps/DetailBaseInfo";
  import DetailShopInfo from "./childComps/DetailShopInfo";
  import DetailParamInfo from "./childComps/DetailParamInfo";
  import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
  import DetailCommentInfo from "./childComps/DetailCommentInfo";

  import Scroll from "../../components/common/scroll/Scroll";
  import GoodsList from "../../components/content/goods/GoodsList";

  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "../../network/detail";
  import {debounce} from "../../common/utils";
  // import {itemListerMixin} from "../../common/mixin";

  export default {
    name: "Detail",
    components: {
      DetailShopInfo,
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      GoodsList,
      Scroll
    },
    // mixins: [itemListerMixin],
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        paramInfo: {},
        detailInfo: {},
        commentInfo: {},
        recommends: [],
        // itemImgListener: null
        themeTopYs: [],
        getThemeTopY: null,
        currentIndex: 0
      }
    },
    created() {
      //1 保存传入的iid
      this.iid = this.$route.params.iid

    //  2 根据iid请求详情数据
      getDetail(this.iid).then(res => {
        // console.log(res);
        const data = res.result;
      //  1 获取顶部的图片轮播数据
        this.topImages = res.result.itemInfo.topImages;

      //  2 获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);

      //  3 获取店铺信息
        this.shop = new Shop(data.shopInfo);

      //  4 保存商品的详情数据
        this.detailInfo = data.detailInfo;

      //  5 获取参数信息
        this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);

      //  6 获取评论信息
        if(data.rate.cRate !== 0){
          this.commentInfo = data.rate.list[0]
        }


      })

    //  3 请求推荐数据
      getRecommend().then(res => {
        this.recommends = res.data.list
      })

    //  4 给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
      this.getThemeTopY = debounce(() => {
        // console.log('刷新');

        this.themeTopYs = []
        // 获取各个滚动区域的高度
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      }, 100)

    },
    mounted() {

    },
    methods: {
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      //详情页点击滚动到对应位置
      titleClick(index) {
        // console.log(index);
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
      },
      contentScroll(position) {
      //  1 获取y值
        const positionY = -position.y

        let length = this.themeTopYs.length

      // 2 跟主题中的值做对比
        for (let i = 0; i < this.themeTopYs.length; i++) {

          // if(positionY > this.themeTopYs[i] && positionY < this.themeTopYs[i+1]){
          //
          // }
          if(this.currentIndex !==i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
              (i === length - 1 &&positionY >= this.themeTopYs[i]))){
            // console.log(i)
            this.currentIndex = i;
            // console.log(this.currentIndex);
            this.$refs.nav.currentIndex = this.currentIndex
          }
        }
      }
    },
    // activated() {
    //   //1 保存传入的iid
    //   this.iid = this.$route.params.iid
    //
    //   //  2 根据iid请求详情数据
    //   getDetail(this.iid).then(res => {
    //     // console.log(res);
    //     const data = res.result;
    //     //  1 获取顶部的图片轮播数据
    //     this.topImages = res.result.itemInfo.topImages;
    //
    //     //  2 获取商品信息
    //     this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
    //   })
    // }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: white;
    height: 100vh;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: white;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>