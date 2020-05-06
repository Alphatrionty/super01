<template>

  <scroll class="content">
    <div class="category-left">
      <div class="category-left-item"
           v-for="item in list"
           :list-item="item">
        {{item.title}}
      </div>
      <div>
        <ul>
          <li>liebiao1</li>
          <li>liebiao2</li>
          <li>liebiao3</li>
          <li>liebiao4</li>
          <li>liebiao5</li>
          <li>liebiao6</li>
          <li>liebiao7</li>
          <li>liebiao8</li>
          <li>liebiao9</li>
          <li>liebiao10</li>
          <li>liebiao11</li>
          <li>liebiao12</li>
          <li>liebiao13</li>
          <li>liebiao14</li>
          <li>liebiao15</li>
          <li>liebiao16</li>
          <li>liebiao17</li>
          <li>liebiao18</li>
          <li>liebiao19</li>
          <li>liebiao20</li>
        </ul>
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
      list: {
        type: Array,
        default() {
          return []
        }
      }
    },
    created() {
      // console.log(item.title);
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
    height: calc(100% - 44px);
    overflow: hidden;
    margin-top: 44px;
  }
</style>