<template>
  <div class="cart-bottom">
    <div class="check-context">
      <cart-check-button 
      :isChecked="isSelectAll"
      @click.native="checkClick"
      />全选
    </div>

    <div class="price">
      合计：{{totalPrice}}
    </div>

    <div class="buy" @click="calcClick">
      去购买({{checkLength}})
    </div>
  </div>
</template>
<script>
  import CartCheckButton from "./CartCheckButton"

  import {mapGetters} from "vuex"
  
  export default {
    name: "CartBottomBar",
    components: {
      CartCheckButton,
    },
    computed: {
      ...mapGetters(['cartList']),
      totalPrice() {
        return '￥' + this.cartList.filter(item => {
          return item.checked
        }).reduce((preValue, item) => {
          return preValue + item.price * item.count
        }, 0)
      },

      checkLength() {
        return this.cartList.filter(item => {
          return item.checked
        }).length
      },

      isSelectAll() {
        return (this.cartList.length === 0) ? false : (!this.cartList.find(item => !item.checked))
        // if (this.cartList.length === 0) {
        //   return false
        // }
        // // return !(this.cartList.filter(item => !item.checked).length)
        // return !this.cartList.find(item => !item.checked)
      }
    },
    methods: {
      checkClick() {
        if (this.cartList.length === 0) {
          return
        }
        if(this.isSelectAll) {
          // for (const item of this.cartList) {
          //   item.checked = false
          // }
          this.cartList.forEach(item => item.checked = false)
          return
        }
        this.cartList.filter(item => !item.checked).forEach(item => item.checked = true)
      },

      calcClick() {
        if (this.cartList.length === 0 || this.cartList.filter(item => item.checked).length === 0) {
          this.$toast.show('请选择需要购买的商品')
        }
      }
    },
  }
</script>
<style scoped>
  .cart-bottom {
    position: absolute;
    bottom: 2.09rem;
    left: 0;
    right: 0;
    display: flex;
    background-color: rgb(228, 228, 228);
    font-size: 0.7rem;
    text-align: center;
    height: 1.9rem;
    line-height: 1.9rem;
  }

  .check-context {
    display: flex;
  }

  .price {
    flex: 1;
  }
  
  .buy {
    width: 5rem;
    background-color: #f03;
    color: #fff;
  }
</style>
