<template>
<!--  ref/children ->-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>

  import BScroll from 'better-scroll'

  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      //1. 创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        click: true,
        //使用实时监听会影响性能,有些页面不需要使用，不要直接定义为3
        // probeType: 3
        probeType: this.probeType,
        //上拉加载更多
        pullUpLoad: this.pullUpLoad
      })

    //  2.监听滚动的位置
      if(this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          //传出位置属性事件,命名为scroll
          this.$emit('scroll', position)
        })
      }


      //3 监听scroll滚动到底部
      if(this.pullUpLoad) {
        this.scroll.on('pullingUp', () => {
          // console.log('滚动到底部');
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      //传入默认值
      scrollTo(x, y, time =300) {
        //判断前面的加载好了没，加载好才调用，否则可能出现buf
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        //封装一层上拉加载函数,在home调用
        this.scroll && this.scroll.finishPullUp()
      },
      refresh() {
        console.log('刷新scroll高度');
        this.scroll && this.scroll.refresh()
      }
    }
  }
</script>

<style scoped>

</style>