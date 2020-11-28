<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" :key="index" class="tab-control-item"
    :class="{active: index === currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index
        this.$emit('tabClick', index)
      }
    },
  }
</script>
<style scoped>
  .tab-control {
    display: flex;
    width: 100%;
    font-size: 0.68rem;
    text-align: center;
    height: 1.68rem;
    line-height: 1.68rem;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding-bottom: 0.26rem;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 0.13rem solid var(--color-tint);
  }
</style>
