const {expect} = require('chai');
let req;
/* 校验应用列表数据 */
function searchAssertFn (result) {
    expect(result).to.have.all.keys('cs', 'data', 'errCode');
    expect(result.data).to.have.all.keys('appLists', 'total');
    expect(result.data.appLists).to.be.a('array');
    expect(result.errCode).to.equal('0');
}
function applicatoin () {
    return new Promise((resolve, reject) => {
        let self = this;
        describe('manager 应用用管理相关接口', function(){
            before(function () {
               // 在这个区块内的所有测试之前运行
            })
            after(function() {
                // 在这个区块内的所有测试之后运行
            })
            beforeEach(function () {
                // 在这个区块内的每个测试运行之前运行
            })
            afterEach(function () {
                // 在这个区块内的每个测试之后运行
            })
            it ('获取应用列表', function(done){
                req.get('/manager/application/search?appName=&count=20&start=1&appGroupId=&isPagination=true')
                .set('cookie', self.cookie)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    searchAssertFn(res.body)
                    self.handleCookieAndRf(res);
                    done();
                })
            })
            it ('获取应用组列表', function(done){
                req.get('/manager/application-group')
                .set('cookie', self.cookie)
                .expect(200)
                .end(function(err, res) {
                    if (err) return done(err);
                    self.handleCookieAndRf(res);
                    done();
                })
            })
            it ('创建应用组', function(done){
                req.post('/manager/application-group')
                .set('cookie', self.cookie)
                .send({name: '测试004', rf: self.rf, type: '2'})
                .expect(200)
                .end(function(err, res) {
                    resolve();
                    if (err) return done(err);
                    self.handleCookieAndRf(res);
                    done();
                })
            })
        })
    })
}
module.exports = (request) => {
    req = request;
    return {
        applicatoin
    }
}