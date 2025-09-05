const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    this.timeout(5000);
    suite('Basic Assertions', function () {
        //#1
        test('convertHandler should correctly read a whole number input', function () {
            assert.strictEqual(convertHandler.getNum('10km'), 10);
        });

        //#2
        test('convertHandler should correctly read a decimal number input', function () {
            assert.strictEqual(convertHandler.getNum('0.3km'), 0.3);
        });

        //#3
        test('convertHandler should correctly read a fractional input', function () {
            assert.strictEqual(convertHandler.getNum('5/4km'), 1.25);
        });

        //#4
        test('convertHandler should correctly read a fractional input with a decimal', function () {
            assert.strictEqual(convertHandler.getNum('5.2/4km'), 1.3);
        });

        //#5
        test('convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3)', function () {
            assert.throws(() => convertHandler.getNum('3/2/3km'), 'invalid number');
        });

        //#6
        test('convertHandler should correctly default to a numerical input of 1 when no numerical input is provided', function () {
            assert.strictEqual(convertHandler.getNum('km'), 1);
        });

        //#7
        test('convertHandler should correctly return an error for an invalid input unit', function () {
            assert.throws(() => convertHandler.getUnit('am'), 'invalid unit');
        });

        //#8
        test('convertHandler should return the correct return unit for each valid input unit', function () {
            assert.strictEqual(convertHandler.getUnit('45km'), 'km');
        });

        //#9
        test('convertHandler should correctly return the spelled-out string unit for each valid input unit', function () {
            assert.strictEqual(convertHandler.spellOutUnit('mi'), 'miles');
        });

        //#10
        test('convertHandler should correctly convert gal to L', function () {
            assert.strictEqual(convertHandler.getReturnUnit('gal'), 'L');
        });

        //#11
        test('convertHandler should correctly convert L to gal', function () {
            assert.strictEqual(convertHandler.getReturnUnit('L'), 'gal');
        });

        //#12
        test('convertHandler should correctly convert L to gal', function () {
            assert.strictEqual(convertHandler.getReturnUnit('mi'), 'km');
        });

        //#13
        test('convertHandler should correctly convert L to gal', function () {
            assert.strictEqual(convertHandler.getReturnUnit('km'), 'mi');
        });

        //#14
        test('convertHandler should correctly convert L to gal', function () {
            assert.strictEqual(convertHandler.getReturnUnit('lbs'), 'kg');
        });

        //#15
        test('convertHandler should correctly convert L to gal', function () {
            assert.strictEqual(convertHandler.getReturnUnit('kg'), 'lbs');
        });
    });
});