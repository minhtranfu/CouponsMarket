import { UserUtils } from '../utils'
import { UIConstants } from '../config/appConstants'

export const createCoupon = async formData => {
  const user = await UserUtils.getUser()

  try {
    return await fetch(`${UIConstants.ApiHost}/coupon/create`, {
      method: 'post',
      headers: {
        Authorization: user.token
      },
      body: formData
    })
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getPage = async (page, pageSize) => {

  const user = await UserUtils.getUser()

  try {
    return await fetch(`${UIConstants.ApiHost}/coupon/getListCoupons?page=${page}&pageSize=${pageSize}`, {
      method: 'GET',
      headers: {
        Authorization: user.token
      }
    })
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getCouponsByCategory = async ({page, pageSize, categoryId}) => {

  const user = await UserUtils.getUser()

  try {
    const url = `${UIConstants.ApiHost}/coupon/getCouponsByCategory?page=${page}&pageSize=${pageSize}&categoryId=${categoryId}`
    console.log(url)
    return await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: user.token
      }
    })
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getNearByCoupons = async data => {
  const user = await UserUtils.getUser()

  try {
    return await fetch(`${UIConstants.ApiHost}/coupon/getListCouponsByLocation`, {
      method: 'post',
      headers: {
        Authorization: user.token
      },
      body: typeof data !== 'string' ? JSON.stringify(data) : data
    })
  } catch (error) {
    console.log(error)
    return false
  }
}

export const search = async data => {
  const user = await UserUtils.getUser()

  try {
    return await fetch(`${UIConstants.ApiHost}/coupon/search`, {
      method: 'post',
      headers: {
        Authorization: user.token
      },
      body: typeof data !== 'string' ? JSON.stringify(data) : data
    })
  } catch (error) {
    console.log(error)
    return false
  }
}

export default {
  createCoupon,
  getPage,
  getNearByCoupons,
  getCouponsByCategory,
  search,
}
