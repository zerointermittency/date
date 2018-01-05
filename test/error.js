'use strict';

const chai = {
        expect: require('chai').expect,
    },
    error = require('../core/error.js');

describe('errors', () => {
    it('paramRequired', () => {
        let paramRequired = error.paramRequired;
        chai.expect(paramRequired.name).to.be.equal('paramRequired');
        chai.expect(paramRequired.code).to.be.equal(100);
        paramRequired = () => {throw error.paramRequired;};
        chai.expect(paramRequired).to.throw('zi-date: Parameter required');
    });
    it('invalidType', () => {
        let invalidType = error.invalidType('number');
        chai.expect(invalidType.name).to.be.equal('invalidType');
        chai.expect(invalidType.code).to.be.equal(101);
        invalidType = () => {throw error.invalidType('number');};
        chai.expect(invalidType).to.throw('zi-date: Expect typeof number');
    });
    it('instanceof', () => {
        let errorInstanceof = error.instanceof('Date');
        chai.expect(errorInstanceof.name).to.be.equal('instanceof');
        chai.expect(errorInstanceof.code).to.be.equal(102);
        errorInstanceof = () => {throw error.instanceof('Date');};
        chai.expect(errorInstanceof).to.throw('zi-date: Expect instanceof Date');
    });
    it('invalidPeriod', () => {
        let invalidPeriod = error.invalidPeriod('type1', ['type1', 'type2']);
        chai.expect(invalidPeriod.name).to.be.equal('invalidPeriod');
        chai.expect(invalidPeriod.code).to.be.equal(103);
        invalidPeriod = () => {throw error.invalidPeriod('foo-bar', ['year|Y', 'month|M', 'day|D', 'hour|h', 'minute|m', 'second|s']);};
        chai.expect(invalidPeriod).to.throw('zi-date: Invalid period "foo-bar", expect [year|Y,month|M,day|D,hour|h,minute|m,second|s]');
    });
});