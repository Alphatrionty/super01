<template>
  <scroll class="content">
    <div class="category-left">
      <div class="category-left-item"
           v-for="item in category">
        {{item.title}}


      </div>
    </div>
  </scroll>

</template>

<script>

  import Scroll from "../scroll/Scroll";
  export default {
    name: "CategoryLeft",
    components: {
      Scroll
    },
    data () {

    },
    props: {
      category: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created() {
    }
  }
</script>

<style scoped>


  .category-left {
    /*display: flex;*/
    width: 100%;
    background-color: #eeeeee;
  }
  .category-left-item {
    display: flex;
    height: 32px;
    font-size: 14px;
    align-items: center;
    /*实现水平居中*/
    justify-content: center;


    border-bottom: 1px solid #666666;
  }

  .category-left-item :hover{
    margin-left: 3px;
    color: var(--color-tint);
  }

  .content {
    width: 30%;
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }
</style>