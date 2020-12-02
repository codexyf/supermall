<template>
  <div class="item-check">
    <div class="check-box" :class="{checked: isChecked}"></div>
  </div>
</template>
<script>
  export default {
    name: "CartCheckButton",
    props: {
      isChecked: {
        type: Boolean,
        default() {
          return false
        }
      }
    },
  }
</script>
<style scoped>
  .item-check {
    width: 1.2rem;
  }

  .check-box {
    position: relative;
    top: calc(50% - 0.35rem);
    width: 0.7rem;
    height: 0.7rem;
    margin: 0 auto;
    border-radius: 0.35rem;
    border: 0.04rem solid rgba(128, 128, 128, .4);
  }

  .check-box.checked {
    width: 1rem;
    height: 1rem;
    border-style: none;
    top: cacl(50% - 0.5rem);
    background: url("~assets/img/cart/yes.svg") 0 0/90% no-repeat;
  }
</style>
