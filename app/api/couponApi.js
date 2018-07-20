import { AsyncStorage } from 'react-native'
import { UIConstants } from '../config/appConstants'

const getUser = async () => {
  let user = await AsyncStorage.getItem('user')
  if (user === null) {
    return null
  }

  user = JSON.parse(user)
  return user
}

export const createCoupon = async formData => {
  user = await getUser()

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

  user = await getUser()

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

export const getNearByCoupons = async data => {
  user = await getUser()

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

export default {
  createCoupon,
  getPage,
  getNearByCoupons
}
