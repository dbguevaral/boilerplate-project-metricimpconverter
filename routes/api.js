'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  app.route('/api/convert/').get((req, res) => {
    const convertHandler = new ConvertHandler();
    const input = req.query.input;

    if(!input) return res.status(400).send('No input provided')

    const initNum = convertHandler.getNum(input);
    console.log("Your input: ", input, "\nYour number: ", initNum); 
    
    const initUnit = convertHandler.getUnit(input);
    console.log("Your unit: ", initUnit);

    if(initUnit === 'invalid unit' && initNum === 'invalid number'){
      return res.send('invalid number and unit');
    }

    if (isNaN(initNum) || !initNum) {
      const string = initNum;
      return res.send(string)
    } 
    
    if (initUnit === 'invalid unit') {
      const string = initUnit;
      return res.send(string)
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    console.log('Your return unit: ', returnUnit);

    const returnNum = convertHandler.convert(initNum, initUnit);
    console.log('Your return number: ', returnNum);

    const string = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    console.log(string)

    return res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: string})
  })
};