<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
     <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
     <slot name="item-text"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: 'red'
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // console.log(this.$route.path)
        // console.log(this.$route.path.indexOf(this.path))
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        // this.$router.push(this.path).catch(err => err)
        this.$router.replace(this.path).catch(err => err)
      }
    },
  }
</script>
<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 2.09rem;
    font-size: 0.64rem;
  }
  .tab-bar-item img {
    width: 1.024rem;
    height: 1.024rem;
    margin-top: 0.126rem;
    vertical-align: middle;
    margin-bottom: 0.084rem;
  }
</style>
