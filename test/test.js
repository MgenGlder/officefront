var expect = require('chai').expect;
var request = require('supertest');
var server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);




describe('Our server', function () {
    context('Authentication api', function () {
        it('should add salt to pwd', function (done) {
            chai.request(server)
                .post('/api/register')
                .type('form')
                .send({
                    'password': "password",
                    'username': "mgenglder"
                })
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body['hash']).to.exist;
                    done();
                });
        });
    });
});