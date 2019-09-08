// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database()

// 云函数入口函数
exports.main = async(event, context) => {
  const id = event.id
  const productRes = await db.collection('product').doc(id).get()
  const product = productRes.data

  const reviewCountRes = await db.collection('review').where({
    productId: id,
  }).count()
  product.reviewCount = reviewCountRes.total

  const firstReviewRes = await db.collection('review').where({
    productId: id,
  }).limit(1).get()
  product.firstReview = firstReviewRes.data[0]

  return product
}