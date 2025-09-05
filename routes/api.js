'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  app.route('/api/convert/').get((req, res) => {
    const convertHandler = new ConvertHandler();
    const input = req.query.input;
    if(!input) return res.status(400).json({ error: 'No input provided' })

    let initNum
    try {
      initNum = convertHandler.getNum(input);
      console.log("Your input: ", input, "\nParsed number: ", initNum); 
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }
    
    let initUnit
    try {
      initUnit = convertHandler.getUnit(input);
      console.log("Your unit: ", initUnit);
    } catch (e) {
      return res.status(400).json({ error: e.message })
    }

    const returnUnit = convertHandler.getReturnUnit(initUnit);
    console.log('Your return unit: ', returnUnit);

    const returnNum = convertHandler.convert(initNum, initUnit);
    console.log('Your return number: ', returnNum);

    const returnString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    console.log(returnString)

    res.json({initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: returnString})
  })
};