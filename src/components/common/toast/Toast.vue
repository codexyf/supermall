<template>
  <div class="toast" v-show="isShow">
    {{message}}
  </div>
</template>
<script>
  export default {
    name: "Toast",
    props: {
      // message: {
      //   type: String,
      //   default() {
      //     return ''
      //   }
      // },
      // show: {
      //   type: Boolean,
      //   default() {
      //     return false
      //   }
      // }
    },
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message='默认文字', duration=2000) {
        this.message = message
        this.isShow = true

        setTimeout(() => {
          this.isShow = false
          this.message = ''
        }, duration);
      }
    },
  }
</script>
<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0.4rem 0.5rem;
    background-color: rgba(0, 0, 0, .8);
    color: #fff;
    z-index: 999;
    font-size: 0.7rem;
  }
</style>
