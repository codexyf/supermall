<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
      </a>
      <div>{{item.title}}</div>
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
    widows: 100%;
    text-align: center;
    font-size: 0.68rem;
    padding: 0.42rem 0 0.84rem;
    border-bottom: 0.42rem solid #eee;
  }
  
  .recommend-item {
    flex: 1;
  }

  .recommend-item img {
    width: 3.1rem;
    height:3.1rem;
    margin-bottom: 0.28rem;
    border-radius: 50%;
  }
</style>
