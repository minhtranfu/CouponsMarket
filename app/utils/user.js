import { AsyncStorage } from 'react-native'

export const getUser = async () => {
  let user = await AsyncStorage.getItem('user')
  if (user === null) {
    return null
  }

  user = JSON.parse(user)
  return user
}

export const UserUtils = {
  getUser
}
