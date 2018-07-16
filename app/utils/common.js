const formatMoney = (number) => {

  return number.toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,').replace(/\.\d+/g, '');

}

export default {
  formatMoney
}
