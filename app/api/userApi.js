import { AsyncStorage } from 'react-native'
import { UserUtils } from '../utils'
import { UIConstants } from '../config/appConstants'

const API_HOST = UIConstants.ApiHost

export const login = async (username, password) => {
  try {

    const body = JSON.stringify({
      username,
      password
    })
    console.log(body)

    const res = await fetch(`${API_HOST}/user/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await res.json()
    console.log(data)

    if (data.token) {
      AsyncStorage.setItem('user', JSON.stringify(data))
    }

    return data.token || false
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const signup = async (dataUser) => {
  try {

    const body = JSON.stringify(dataUser)
    console.log(body)

    const res = await fetch(`${UIConstants.ApiHost}/user/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body,
    });

    const data = await res.json()

    if (data.token) {
      AsyncStorage.setItem('user', JSON.stringify(data))
    }

    return data || false
  } catch (error) {
    console.log(error)
    throw error
  }
}

export const logout = async () => {
  try {
    await AsyncStorage.clear()
  } catch (error) {
    console.log(error)
  }
}

export const followCoupon = async (couponId) => {
  const user = await UserUtils.getUser()
  try {
    const res = await fetch(`${API_HOST}/user/followCoupon`, {
      method: 'POST',
      headers: {
        Authorization: user.token
      },
      body: JSON.stringify({ couponId })
    })

    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export const buyCoupon = async (password, couponId) => {
  const user = await UserUtils.getUser()
  try {
    const res = await fetch(`${API_HOST}/user/buyCoupon`, {
      method: 'POST',
      headers: {
        Authorization: user.token
      },
      body: JSON.stringify({ password, couponId })
    })

    const data = await res.json()

    return data
  } catch (error) {
    console.log(error)
  }
}

export default {
  login,
  logout,
  signup,
  followCoupon,
  buyCoupon,
}
