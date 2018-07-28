var expect = require('chai').expect;
var request = require('supertest');
var server = require('../server');
var registerController = require('../src/app_api/controllers/authentication');
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();

chai.use(chaiHttp);

function startServer() {
    server();
}

describe('Our server', function() {
    var app;
    //TODO: Start building some tests for sanity checks.
    // before(function(){
    //     startServer();
    // });
    // it('should send back a json object after')
    it('should add salt to pwd', function (done) {
        chai.request(server)
            .post('/api/register')
            .type('form')
            .send({
                'password':"password",
                'username':"mgenglder"
            })
            .end((err, res) => {
                console.log("The response was.. ");
                console.log(res.body);
                expect(res.status).to.equal(200);
                expect(res.body).to.be.a('object');
                expect(res.body['hash']).to.exist;
                done();
            });
    });
})