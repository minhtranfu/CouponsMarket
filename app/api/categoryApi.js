import { AsyncStorage } from 'react-native'
import { UserUtils } from '../utils'
import { UIConstants } from '../config/appConstants'

export const getAll = async data => {
  let result = await AsyncStorage.getItem('listCategory')
  if (result) {
    result = JSON.parse(result)
    if (Array.isArray(result)) {
      return result
    }
  }

  try {
    result = await fetch(`${UIConstants.ApiHost}/category/getAll`)

    result = await result.json()
    if(Array.isArray(result)) {
      AsyncStorage.setItem('listCategory', JSON.stringify(result))
    } else {
      result = []
    }

    return result
  } catch (error) {
    console.log(error)
    return false
  }
}

export default {
  getAll
}
