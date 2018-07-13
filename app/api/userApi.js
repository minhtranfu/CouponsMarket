import { AsyncStorage } from "react-native"

export const login = async (username, password) => {
  try {

    const body = JSON.stringify({
      username,
      password
    })
    console.log(body)

    const res = await fetch('http://vus.hoctot.net:3030/user/login', {
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

    return data.token || false
  } catch (error) {
    console.log(error)
    throw error
  }
}

export default {
  login
}
