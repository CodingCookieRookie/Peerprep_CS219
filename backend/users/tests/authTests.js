// Import the dependencies for testing
var chai = require('chai');
var chaiHttp = require('chai-http');
var app = require('../index');
const users = require('../dummy/users').users;
const accounts = require('../dummy/users').accounts;
const User = require('../models/userModel');
const { after } = require('mocha');
const AUTH_API = {
    register: '/api/auth/register',
    login: '/api/auth/login'
}

// Set up chai for testing
chai.use(chaiHttp);
chai.should();

// REGISTER tests
describe("Registration unit tests", () => {
    // POST a user into DB
    it('Register a account successfully', (done) => {
        chai.request(app)
            .post(AUTH_API.register)
            .send(users[0])
            .end((error, result) => {
                result.should.have.status(201);
                result.body.data.should.have.property('username');
                result.body.data.should.have.property('email');
                result.body.data.username.should.equal(users[0].username);
                result.body.data.email.should.equal(users[0].email);
                done();
            });
    });

    it('Fail to create a account due to missing fields', (done) => {
        chai.request(app)
            .post(AUTH_API.register)
            .send(users[1])
            .end((error, result) => {
                result.should.have.status(400);
                result.body.should.have.property('message');
                result.body.message.should.equal('Fill in all fields.');
                done();
            });
    });

    it('Fail to create a account due to incorrect email', (done) => {
        chai.request(app)
            .post(AUTH_API.register)
            .send(users[2])
            .end((error, result) => {
                result.should.have.status(405);
                result.body.should.have.property('message');
                result.body.message.should.equal('Please use an email that starts with ".edu"');
                done();
            });
    });

    it('Fail to create a duplicate account', (done) => {
        chai.request(app)
            .post(AUTH_API.register)
            .send(users[0])
            .end((error, result) => {
                result.should.have.status(405);
                result.body.should.have.property('message');
                result.body.message.should.equal('There exists a current account with this username. Please login or change your username.');
                done();
            });
    });

    after('Clear data', () => {
        User.deleteOne({username: users[0].username}, (error) => {
            // console.log(error)
        })
    })
});

// LOGIN tests
describe("Login unit tests", () => {

    before('Create acc first', (done) => {
        chai.request(app)
            .post(AUTH_API.register)
            .send(users[0])
            .end(() => {
                done()
            })
    });


    it('Login successfully', (done) => {
        chai.request(app)
            .post(AUTH_API.login)
            .send(accounts[0])
            .end((error, result) => {
                result.should.have.status(200);
                result.body.should.have.property('token');
                result.body.user.should.have.property('username');
                result.body.user.should.have.property('email');
                result.body.user.username.should.equal(users[0].username);
                result.body.user.email.should.equal(users[0].email);
                done();
            });
    });

    it('Fail to login due to missing fields', (done) => {
        chai.request(app)
            .post(AUTH_API.login)
            .send(accounts[1])
            .end((error, result) => {
                result.should.have.status(400);
                result.body.should.have.property('message');
                result.body.message.should.equal('Fill in all fields.');
                done();
            });
    });

    it('Fail to create a account due to non-existent account', (done) => {
        chai.request(app)
            .post(AUTH_API.login)
            .send(accounts[2])
            .end((error, result) => {
                result.should.have.status(400);
                result.body.should.have.property('message');
                result.body.message.should.equal('User account not recorded in system.');
                done();
            });
    });

    it('Fail to create a account due to incorrect password', (done) => {
        chai.request(app)
            .post(AUTH_API.login)
            .send(accounts[3])
            .end((error, result) => {
                result.should.have.status(400);
                result.body.should.have.property('message');
                result.body.message.should.equal('Invalid credentials.');
                done();
            });
    });


    after('Clear data', () => {
        User.deleteOne({username: users[0].username}, (error) => {
            // console.log(error)
        })
    })
});