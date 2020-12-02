<template>
  <div class="cart-list-item">
    <cart-check-button
    @click.native="checkClick"
    :isChecked="product.checked"
    ref="checkButtonRef"
    />
    <div class="item-img" @click=""checkClick>
      <img :src="product.image" alt="">
    </div>
    <div class="item-info" @click="infoClick(product)">
      <p class="item-title">
        {{product.title}}
      </p>
      <p class="item-desc">
        {{product.desc}}
      </p>
      <span class="item-price">
        ￥{{product.price}}
      </span>
      <span class="item-count">
        x{{product.count}}
      </span>
    </div>
  </div>
</template>
<script>
  import CartCheckButton from "./CartCheckButton"

  export default {
    name: "CartListItem",
    props: {
      product: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    components: {
      CartCheckButton
    },
    methods: {
      checkClick() {
        this.product.checked = !this.product.checked
      },

      infoClick(product) {
        this.$router.push("/detail/" + product.iid)
      }
    }
  }
</script>
<style scoped>
  .cart-list-item {
    width: 100%;
    height: 5rem;
    border-bottom: 0.04rem solid rgba(128, 128, 128, .4);
    display: flex;
    padding: 0.4rem;
    padding-left: 0;
  }

  .item-img {
    width: 3.5rem;
    height: 100%;
  }

  .item-img img {
    width: 100%;
    height: 100%;
    border-radius: 0.4rem;
  }

  .item-info {
    position: relative;
    width: calc(100% - 3.5rem - 1.2rem - 0.4rem);
    margin-left: 0.4rem;
  }

  .item-info p {
    display: inline-block;
    width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .item-title {
    font-size: 0.75rem;
    padding-bottom: 0.5rem;
  }

  .item-desc {
    font-size: 0.6rem;
    color: #999;
  }

  .item-price {
    position: absolute;
    left: 0;
    bottom: 0.4rem;
    font-size: 0.75rem;
    color: orangered;
  }

  .item-count {
    position: absolute;
    right: 0.4rem;
    bottom: 0.4rem;
    font-size: 0.75rem;
  }
</style>
