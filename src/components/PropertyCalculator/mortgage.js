export const calculatePrinciple = (
    propertyValue,
    interestRate,
    downPayment,
    loanTerm
  ) => {
    const monthlyRate = interestRate / 100 / 12;
    const payments = 12 * loanTerm;
  
    const x = Math.pow(1 + monthlyRate, payments);
    //console.log("calculate_principle", propertyValue, interestRate, downPayment, loanTerm);
  
    //var calculate_principle = roundNumber(((propertyValue - (propertyValue * downPayment) / 100) * x * monthlyRate) / (x - 1));
    var calculate_principle = roundNumber(((propertyValue - downPayment) * x * monthlyRate) / (x - 1));
    
    return calculate_principle;
    
  };
  
  export const calculateMonthlyPayment = (
    propertyValue,
    interestRate,
    downPayment,
    loanTerm
  ) => {
  
    //console.log("calculate_payment", propertyValue, interestRate, downPayment, loanTerm);
    var calculate_payment = roundNumber(calculatePrinciple(propertyValue, interestRate, downPayment, loanTerm));
  
    return calculate_payment;
  }
  
  export const roundNumber = num => {
    return Math.round(num * 100) / 100;
  };
  
  export const PMT = (rate, periods, present, future, type) => {
    // Credits: algorithm inspired by Apache OpenOffice
  
    // Initialize type
    type = (typeof type === 'undefined') ? 0 : type;
  
    // Evaluate rate (TODO: replace with secure expression evaluator)
    rate = eval(rate);
  
    // Return payment
    var result;
    if (rate === 0) {
      result = (present + future) / periods;
    } else {
      var term = Math.pow(1 + rate, periods);
      if (type === 1) {
        result = (future * rate / (term - 1) + present * rate / (1 - 1 / term)) / (1 + rate);
      } else {
        result = future * rate / (term - 1) + present * rate / (1 - 1 / term);
      }
    }
    //return -result;
    return result;
  }
  
  export const FV = (rate, periods, payment, value, type) => {
    // Credits: algorithm inspired by Apache OpenOffice
  
    // Initialize type
    type = (typeof type === 'undefined') ? 0 : type;
  
    // Evaluate rate (TODO: replace with secure expression evaluator)
    rate = eval(rate);
  
    // Return future value
    var result;
    if (rate === 0) {
      result = value + payment * periods;
    } else {
      var term = Math.pow(1 + rate, periods);
      if (type === 1) {
        result = value * term + payment * (1 + rate) * (term - 1.0) / rate;
      } else {
        result = value * term + payment * (term - 1) / rate;
      }
    }
    //return -result;
    return result;
  }
  
  export const IPMT = (rate, period, periods, present, future, type) => {
    // Credits: algorithm inspired by Apache OpenOffice
  
    // Initialize type
    type = (typeof type === 'undefined') ? 0 : type;
  
    // Evaluate rate and periods (TODO: replace with secure expression evaluator)
    rate = eval(rate);
    periods = eval(periods);
  
    // Compute payment
    var payment = PMT(rate, periods, present, future, type);
    
    // Compute interest
    var interest;
    if (period === 1) {
      if (type === 1) {
        interest = 0;
      } else {
        //interest = -present;
        interest = present;
      }
    } else {
      if (type === 1) {
        interest = FV(rate, period - 2, payment, present, 1) - payment;
      } else {
        interest = FV(rate, period - 1, payment, present, 0);
      }
    }
    
    // Return interest
    return interest * rate;
}