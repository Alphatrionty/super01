<template>
  <div id="category">
    <nav-bar class="category-nav"><div slot="center">分类</div></nav-bar>


<!--      <category-left :category="category"></category-left>-->

  </div>
</template>

<script>
  /**
   * 导入第三方滚动
   */
  import BScroll from 'better-scroll'
  import CategoryLeft from "../../components/common/categorynav/CategoryLeft";
  import NavBar from "../../components/common/navbar/NavBar";
  import Scroll from "../../components/common/scroll/Scroll";


  import {getCategorydata} from "../../network/category";

  export default {
    name: "Category",
    data() {
      return {
        category: [],
        // scroll: null
      }
    },
    components: {
      CategoryLeft,
      NavBar,
      Scroll,
    },
    // computed: {
    //   showlist() {
    //     return this.category
    //   }
    // },
    created() {
      //  1 请求多个数据
      this.getCategorydata()
    },
    //组件创建完后调用
    // mounted() {
      // this.scroll = new BScroll(document.querySelector('.wrapper'), {
      //   probeType: 3,
      //   pullUpLoad: true,
      //   click: true
      // })
      //
      // this.scroll.on('scroll', (position) => {
      //   console.log(position);
      // })
      //
      // this.scroll.on('pullingUp', () => {
      //
      // })
      // getCategorydata ()
    // },
    methods: {
      // btnClick() {
        // console.log('btnClick');
      // },
      /**
       *网络请求相关的方法
       */
      getCategorydata() {
        getCategorydata().then(res => {
          // console.log(res);
          this.category = res.data.category.list;
        })
      }

    }
  }
</script>

<style scoped>
  #category {
    /*padding-top: 44px;*/

    /*viewport height 视高*/
    height: 100vh;
  }
  /*.wrapper {*/
  /*  height: 150px;*/
  /*  background-color: greenyellow;*/

    /*overflow: hidden;*/
    /*局部滚动*/
    /*overflow-y: scroll;*/
  /*}*/
  .category-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }




</style>
