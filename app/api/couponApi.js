export const createCoupon = async formData => {
  try {
    return await fetch('http://cpm.hoctot.net/coupon/create', {
      method: 'post',
      body: formData
    })
  } catch (error) {
    console.log(error)
    return false
  }
}

export const getPage = async (page, pageSize) => {
  try {
    return await fetch('http://cpm.hoctot.net/coupon/getListCoupons', {
      method: 'GET',
      body: JSON.stringify({
        page,
        pageSize
      })
    })
  } catch (error) {
    console.log(error)
    return false
  }
}

export default {
  createCoupon,
  getPage
}
