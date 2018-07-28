var expect = require('chai').expect;
var request = require('supertest');
var server = require('../server');
var registerController = require('./src/app_api/controllers/authentication');
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
    it('should add salt to pwd', (done) => {
        chai.request(registerController)
            .post('/register')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            })
    })
})