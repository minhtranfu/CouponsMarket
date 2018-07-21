import { AsyncStorage } from 'react-native'
import { UIConstants } from '../config/appConstants'

export const login = async (username, password) => {
  try {

    const body = JSON.stringify({
      username,
      password
    })
    console.log(body)

    const res = await fetch(`${UIConstants.ApiHost}/user/login`, {
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

export default {
  login,
  signup,
  logout
}
