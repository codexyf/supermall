import {
  ADD_TO_CART,
  ADD_COUNTER,
} from "./mutation.types"

export default {
  // 购物车存在该商品，数量+1
  [ADD_COUNTER](state, payload) {
    payload.count++
  },

  // 购物车中不存在该商品，添加
  [ADD_TO_CART](state, payload) {
    payload.checked = true
    state.cartList.push(payload)
  }
}