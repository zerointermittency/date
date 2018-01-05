'use strict';

const chai = {
    expect: require('chai').expect,
};

describe('ZIDate', () => {
    const  ZIDate = require('../ZIDate.js'),
        date1 = new ZIDate(1505865600000), // 2017-09-20T00:00:00Z
        date2 = new ZIDate(1504224000000), // 2017-09-01T00:00:00Z
        date3 = new ZIDate(1505905140000); // 2017-09-20T10:59:00Z

    it('instanceof Date', () => {
        chai.expect(date1 instanceof Date).to.be.true;
    });
    it('toISOString', () => {
        chai.expect(date1.toISOString()).to.be.equal('2017-09-20T00:00:00Z');
        chai.expect(ZIDate.toISOString(date1)).to.be.equal('2017-09-20T00:00:00Z');
    });
    it('add', () => {
        let copyDate1 = new ZIDate(date1);
        copyDate1.add(120);
        chai.expect(copyDate1.toISOString()).to.be.equal('2017-09-20T00:02:00Z');
        chai.expect(copyDate1.add(120).toISOString()).to.be.equal('2017-09-20T00:04:00Z');
        chai.expect(() => copyDate1.add()).to.throw('zi-date: Parameter required');
        chai.expect(() => copyDate1.add('foo-bar')).to.throw('zi-date: Expect typeof number');
        copyDate1 = new ZIDate(date1);
        // retorna un nuevo objeto (inmutable)
        chai.expect(copyDate1.add(120, true).toISOString()).to.be.equal('2017-09-20T00:02:00Z');
        chai.expect(copyDate1.toISOString()).to.be.equal('2017-09-20T00:00:00Z');
    });
    it('substract', () => {
        let copyDate1 = new ZIDate(date1);
        copyDate1.substract(120);
        chai.expect(copyDate1.toISOString()).to.be.equal('2017-09-19T23:58:00Z');
        chai.expect(copyDate1.substract(120).toISOString()).to.be.equal('2017-09-19T23:56:00Z');
        chai.expect(() => copyDate1.substract()).to.throw('zi-date: Parameter required');
        chai.expect(() => copyDate1.substract('foo-bar')).to.throw('zi-date: Expect typeof number');
        copyDate1 = new ZIDate(date1); // 2017-09-20T00:00:00Z
        // retorna un nuevo objeto (inmutable)
        chai.expect(copyDate1.substract(120, true).toISOString()).to.be.equal('2017-09-19T23:58:00Z');
        chai.expect(copyDate1.toISOString()).to.be.equal('2017-09-20T00:00:00Z');
    });
    it('diff', () => {
        chai.expect(date1.diff(date2, 'D')).to.be.equal(19); // 19 dias
        chai.expect(date1.diff(date2, 'day')).to.be.equal(19); // 19 dias
        chai.expect(date1.diff(date2, 'hour')).to.be.equal(456); // 19 dias => 456 hours
        chai.expect(date1.diff(date2, 'minute')).to.be.equal(27360); // 19 dias => 456 hours => 27360 minutes
        chai.expect(date1.diff(date2)).to.be.equal(1641600); // 1641600 segundos => 19 dias
        chai.expect(() => date1.diff()).to.throw('zi-date: Parameter required');
        chai.expect(() => date1.diff('foo-bar')).to.throw('zi-date: Expect instanceof Date');
        chai.expect(() => date1.diff(date2, 'asdf')).to.throw('zi-date: Invalid period "asdf", expect [day|D,hour|h,minute|m,second|s]');
    });
    it('before', () => {
        let date1 = new ZIDate(1505865600 * 1000), // 2017-09-20T00:00:00Z
            date2 = new ZIDate(1504224000 * 1000); // 2017-09-01T00:00:00Z
        chai.expect(date2.before(date1)).to.be.true;
        chai.expect(date1.before(date2)).to.be.false;
        chai.expect(() => date1.before()).to.throw('zi-date: Parameter required');
        chai.expect(() => date1.before('foo-bar')).to.throw('zi-date: Expect instanceof Date');
    });
    it('after', () => {
        chai.expect(date1.after(date2)).to.be.true;
        chai.expect(date2.after(date1)).to.be.false;
        chai.expect(() => date1.after()).to.throw('zi-date: Parameter required');
        chai.expect(() => date1.after('foo-bar')).to.throw('zi-date: Expect instanceof Date');
    });
    it('equal', () => {
        chai.expect(date1.equal(date1, 'second')).to.be.true;
        chai.expect(date1.equal(date1)).to.be.true;
        chai.expect(date1.equal(date2, 'second')).to.be.false;
        chai.expect(date1.equal(date2)).to.be.false;
        chai.expect(date1.equal(date2, 'month')).to.be.true;
        chai.expect(date1.equal(date2, 'day')).to.be.false;
        chai.expect(date1.equal(date3, 'year')).to.be.true;
        chai.expect(date1.equal(date3, 'month')).to.be.true;
        chai.expect(date1.equal(date3, 'day')).to.be.true;
        chai.expect(date1.equal(date3, 'hour')).to.be.false;
        chai.expect(() => date1.equal()).to.throw('zi-date: Parameter required');
        chai.expect(() => date1.equal('foo-bar')).to.throw('zi-date: Expect instanceof Date');
        chai.expect(() => date1.equal(date2, 'foo-bar')).to.throw('Invalid period "foo-bar", expect [year|Y,month|M,day|D,hour|h,minute|m,second|s]');
    });
});