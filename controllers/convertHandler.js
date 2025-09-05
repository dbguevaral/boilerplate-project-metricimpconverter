function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let regex;
    let regexString;

    if (!/\d/.test(input)) { //when there's no digits, return 1
      result = 1;
    }
    
    else if (input.includes('.') && !input.includes('/')) { //when string includes a dot, get its decimal part, convert it to number then save it
      regex = /^\d*\.\d+/;
      regexString = /^\d*\.\d+[a-zA-Z]+$/
      if (!regexString.test(input)) throw new Error("invalid number");

      const num = Number(input.match(regex)[0]);
      result = num;
    }

    else if (input.includes('/')) { //when string includes a backslash, get both numerator and denominator as numbers, divide them, then get the result
      regex = /^\d*\.?\d+\/\d*\.?\d+/;
      regexString = /^\d*\.?\d+\/\d*\.?\d+[a-zA-Z]+$/

      if (!regex.test(input)) throw new Error("invalid number"); 
      let [numerator, denominator] = input.match(regex)[0].split('/').map(Number);
      
      if (!regexString.test(input)) throw new Error("invalid number"); 
      if (denominator === 0 || isNaN(denominator)) throw new Error("invalid number");

      const num = numerator / denominator;
      result = num;
    }

    else { //when string start including only numbers and then it can be whatever
      regex = /^\d+/;
      regexString = /^\d+[a-zA-Z]+$/
      if (!regexString.test(input)) throw new Error("invalid number"); 
      const num = Number(input.match(regex)[0]);
      result = num;
    }

    return result;
  };
  
  this.getUnit = function(input) {
    let result;
    const units = ["mi", "km", "gal", "l", "lbs", "kg"]; //sets the allowed units for convertion
    const regex = /[a-zA-Z]+$/;
    const match = input.match(regex); //gets the matched part of the string that contains letters
    if (!match) throw new Error("invalid unit");
    const unit = match[0].toLowerCase(); 

    result = units.find( el => el === unit) //looks if the string unit matches any metric/imperial units for later convertion 
    
    if (!result) throw new Error('invalid unit')

    return result; 
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    const unitMap = { mi: "km", km: "mi", gal: "L", l: "gal", lbs: "kg", kg: "lbs" }; 
    result = unitMap[initUnit.toLowerCase()]; //maps the unit to then get the converted metric/imperial unit

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const unitMap = { mi: "miles", km: "kilometers", gal: "gallons", l: "liters", lbs: "pounds", kg: "kilograms" };
    result = unitMap[unit.toLowerCase()];
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case "mi": result = Math.round(initNum * miToKm * 1000) / 1000; break;
      case "gal": result = Math.round(initNum * galToL* 1000) / 1000; break;
      case "lbs": result = Math.round(initNum * lbsToKg* 1000) / 1000; break;
      case "km": result = Math.round(initNum / miToKm* 1000) / 1000; break;
      case "l": result = Math.round(initNum / galToL* 1000) / 1000; break;
      case "kg": result = Math.round(initNum / lbsToKg* 1000) / 1000; break;
    }
    
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    const fullInitUnit = this.spellOutUnit(initUnit);
    const fullReturnUnit = this.spellOutUnit(returnUnit);

    result = `${initNum} ${fullInitUnit} converts to ${returnNum} ${fullReturnUnit}`;
    
    return result;
  };
  
}

module.exports = ConvertHandler;