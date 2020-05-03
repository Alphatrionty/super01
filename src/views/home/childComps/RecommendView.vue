<template>
  <div class="recommend">
    <div v-for="item in recommends" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props: {
       recommends: {
         type: Array,
         default() {
           return []
         }
       }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 12px;

    padding: 4px 0 12px;
    border-bottom: 8px solid #eeeeee;
  }

  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 76px;
    height: 75px;
    margin-bottom: 4px;
  }
</style>