const supertest = require('supertest');
const request = supertest('http://192.168.2.25:3000');
const {applicatoin} = require('./application')(request);

const unitTest = require('./base')(request);
unitTest.login().then(data => {
    unitTest.prejobs.push(applicatoin);
    unitTest.doUnitTestJobs();
})