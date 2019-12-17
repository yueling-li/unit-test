const {expect} = require('chai');
let req;
class Base {
    constructor () {
        this.cookie = '';
        this.rf = '';
        this.prejobs = [];
    }
    login () {
        let self = this;
        return new Promise((resolve, reject) => {
            describe('manager 登录接口', () => {
                it ('responds with json', (done) => {
                    req.post('/manager/login')
                    .set('username', 'cmVkY29yZUB5dW5zaGlwZWkuY29t')
                    .set('password', 'Y05CT2U5b2xraTVxUFhwUU5pZGt6WW9XZ0IzQ2NJQjNMRXgyRmJ4MUZ5QmR6VEtyODZFVEN6MDhTZ2orQlJEdXVUOGFqYnJQcGFGNWF0TWNqOXo2M2dGNnVXcUJocGVWN1cveDRRSi9oSVlyd3hucDU4M1crZjI0UU0ySGZyTE9SbnhnRzZ4eGtiaytxZ2VobitGSEdUZXJIK0dKMVpYYlBnK0hRcjBZc0RNPQ==')
                    .expect(200)
                    .end(function(err, res) {
                        if (err) return done(err);
                        self.cookie = res.headers['set-cookie'].join(';');
                        self.assertLoginFn(res.body);
                        done()
                        resolve()
                    })
                })
            })
        })
    }
    async doUnitTestJobs () {
        for (const job of this.prejobs) {
            await job.call(this);
        }
    }
    assertLoginFn (result) {
        expect(result).to.have.all.keys('data', 'errCode');
        expect(result.data).to.have.all.keys('roleId', 'loginName', 'lastUpdate', 'isFirstLogin', 'failedLoginTimes', 'companyCategory', 'license', 'plugins');
        expect(result.data.license).to.have.all.keys('companyName', 'edition', 'functionModule', 'isAIO', 'managerPrivilege', 'startTime', 'status', 'type');
        expect(result.errCode).to.equal('0')
    }
    handleCookieAndRf (res) {
        let self = this;
        if (res.headers['set-cookie'].length > 1) self.cookie = res.headers['set-cookie'].join(';');
        self.rf = res.body.cs.split('').reverse().join('');
    }
}
module.exports = (request) => {
    req = request;
    return new Base()
}
    