const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
    this.timeout(5000);
    suite('Integration tests with chai-http', function () {

        //#1 Convert a valid input such as 10L: GET request to /api/convert.
        test('Testing GET request to /api/convert with 10L as input', function (done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert')
                .query({ input: '10L' })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initNum, 10);
                    assert.equal(res.body.initUnit, 'l');
                    assert.equal(res.body.returnNum, 2.642);
                    assert.equal(res.body.returnUnit, 'gal');
                    assert.equal(res.body.string, '10 liters converts to 2.642 gallons');
                    done();
            });
        });

        //#2 Convert an invalid input such as 32g: GET request to /api/convert.
        test('Testing GET request to /api/convert with 32g as input', function (done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert')
                .query({ input: '32g' })
                .end(function (err, res) {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.error, 'invalid unit');
                    done();
            });
        });

        //#3 Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.
        test('Testing GET request to /api/converter with 3/7.2/4kg as input', function (done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert')
                .query({ input: '3/7.2/4kg' })
                .end(function (err, res) {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.error, 'invalid number');
                    done();
            });
        });

        //#4 Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.
        test('Testing GET request to /api/converter with 3/7.2/4kg as input', function (done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert')
                .query({ input: '3/7.2/4kg' })
                .end(function (err, res) {
                    assert.equal(res.status, 400);
                    assert.equal(res.body.error, 'invalid number');
                    done();
            });
        });

        //#5 Convert with no number such as kg: GET request to /api/convert.
        test('Testing GET request to /api/converter with kg as input', function (done) {
            chai
                .request(server)
                .keepOpen()
                .get('/api/convert')
                .query({ input: 'kg' })
                .end(function (err, res) {
                    assert.equal(res.status, 200);
                    assert.equal(res.body.initNum, 1);
                    assert.equal(res.body.initUnit, 'kg');
                    assert.equal(res.body.returnNum, 2.205);
                    assert.equal(res.body.returnUnit, 'lbs');
                    assert.equal(res.body.string, '1 kilograms converts to 2.205 pounds');
                    done();
            });
        });
    });
});
