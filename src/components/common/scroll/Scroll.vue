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
        probeType: this.probeType
      })

    //  2.监听滚动的位置
      this.scroll.on('scroll', (position) => {
        //传出位置属性事件,命名为scroll
        this.$emit('scroll', position)
      })
    },
    methods: {
      //传入默认值
      scrollTo(x, y, time =300) {
        this.scroll.scrollTo(x, y, time)
      }
    }
  }
</script>

<style scoped>

</style>