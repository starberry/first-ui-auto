/**
 * Number
 */
export const numberFormat = ( num ) => {
    if (!num) return 0
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/format
    return new Intl.NumberFormat("en-US", {}).format(num)
  }
  
  /**
   * parseInt
   */
  export const filterNumber = ( str ) => {
    if (!str) return 0
    str = str.toString()
    return parseInt(str.replace(/[^\d.]/g, ""), 10)
  }
  
  export const jsUcfirst = ( str ) => {
      return (str.charAt(0).toUpperCase() + str.slice(1));
  }
  
  export const objVals = ( obj ) => {
      return Object.values(obj);
  }
  
  /**
 * Interest rate, periods, Present value of loan, Future value of loan, Calculated at start of each period
 */
export const pmt = (rate, periods, present, future = 0, type = 1) => {
  if (isNaN(rate) || isNaN(periods) || !periods || !rate) {
    return 0
  }

  if (rate === 0) {
    return -((present + future) / periods)
  } else {
    var term = Math.pow(1 + rate, periods)
    if (type === 1) {
      return -(
        ((future * rate) / (term - 1) + (present * rate) / (1 - 1 / term)) /
        (1 + rate)
      )
    } else {
      return -((future * rate) / (term - 1) + (present * rate) / (1 - 1 / term))
    }
  }
}