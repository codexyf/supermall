<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <template #center>
        <div>购物车({{length}})</div>
      </template>
    </nav-bar>
  </div>
</template>
<script>
  import NavBar from "components/common/navbar/NavBar"
  import { mapGetters } from "vuex"

  export default {
    name: "CartNavBar",
    components: {
      NavBar
    },
    computed: {
      ...mapGetters(
        {
          'length': 'cartLength'
        }
      )
    },
  }
</script>
<style scoped>
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }
</style>
