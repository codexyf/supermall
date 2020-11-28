<template>
  <div class="nav-bar">
    <div class="left">
      <slot name="left"></slot>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>
<script>
  export default {
    name: "NavBar",
  }
</script>
<style scoped>
  .nav-bar {
    display: flex;
    line-height: 1.9rem;
    height: 1.9rem;
    text-align: center;
    box-shadow: 0 0.04rem 0.08rem rgba(100, 100, 100, .1);
    font-size: 0.768rem;
  }

  .left, .right {
    width: 2.56rem;
  }

  .center {
    flex: 1;
  }
</style>
