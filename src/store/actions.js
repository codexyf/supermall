import {
  ADD_CART,
  ADD_COUNTER,
  ADD_TO_CART
} from "./mutation.types"

export default {
  [ADD_CART](context, payload) {
    return new Promise((resolve, reject) => {
    // for (const item of state.cartList) {
    //   if (item.iid === payload.iid) {
    //     item.count += 1
    //     return
    //   }
    // }
    let oldProduct = context.state.cartList.find((item) => (item.iid === payload.iid))
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
      resolve('当前数量加1')
    }
    context.commit(ADD_TO_CART, payload)
    resolve('添加了新的商品')
    })
  }
}