var expect = require('chai').expect;
var request = require('supertest');
var server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');
let mongoose = require('mongoose');
const User = mongoose.model('Users');

chai.use(chaiHttp);

let appUrl = 'http://localhost:8080';



beforeAll(() => {
    
})

describe('Our server', function () {
    context('Authentication api', function () {
        it('should add salt to pwd', function (done) {
            chai.request(server)
                .post('/api/register')
                .send({
                    'password': "password",
                    'username': "mgengslder",
                    'email': 'test@test.com',
                    'firstName': 'Sally',
                    'lastName': 'Mae'
                })
                .end((err, res) => {
                    console.log(res.body);
                    expect(res.status).to.equal(200);
                    expect(res.body).to.be.a('object');
                    expect(res.body['response']['registered']).to.exist;
                    done();
                });
        });

        xit('should add salt to pwd', async function () {
            await request(server)
                .get('/api/register')
                .send({
                    'password': 'password',
                    'username': 'mgenglder'
                })
                .type('form')
                .expect(res.status).to.equal(200)
                .expect(res.body).to.be.a('object')
                .expect(res.body['response']['registered']).to.exist
        })
    });
});