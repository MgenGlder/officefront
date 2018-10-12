var expect = require('chai').expect;
var request = require('supertest');
var server = require('../server');
let chai = require('chai');
let chaiHttp = require('chai-http');

chai.use(chaiHttp);

let appUrl = 'http://localhost:8080';




describe('Our server', function () {
    context('Authentication api', function () {
        it('should add salt to pwd', function (done) {
            chai.request(server)
                .post('/api/register')
                .type('form')
                .send({
                    'password': "password",
                    'username': "mgengslder",
                    'email': 'test@test.com',
                    'firstName': 'Sally',
                    'lastName': 'Mae'
                })
                .end((err, res) => {
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