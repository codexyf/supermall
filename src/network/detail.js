import {request} from "./request"

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend',
  })
}

// 传出一个类，商品数据
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title
    this.desc = itemInfo.desc
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.discount = itemInfo.discountDesc
    this.discountBgColor = itemInfo.discountBgColor
    this.columns = columns
    this.services = services
    this.realPrice = itemInfo.lowNowPrice
  }
}

// 店铺信息类
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo
    this.score = shopInfo.score
    this.fans = shopInfo.cFans
    this.goods = shopInfo.cGoods
    this.sells = shopInfo.cSells
    this.name = shopInfo.name
  }
}

export class GoodsParam {
  constructor(info, rule) {
    this.image = info.image ? info.image[0] : ""
    this.infos = info.set
    this.sizes = rule.tables
  }
}