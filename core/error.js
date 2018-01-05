'use strict';

const ZIError = require('@zerointermittency/error');

class DateError extends ZIError {

    constructor(opts) {
        opts.prefix = 'zi-date';
        super(opts);
    }

}

module.exports = {
    paramRequired: new DateError({
        code: 100,
        name: 'paramRequired',
        message: 'Parameter required',
        level: ZIError.level.fatal,
    }),
    invalidType: (type) => new DateError({
        code: 101,
        name: 'invalidType',
        message: `Expect typeof ${type}`,
        level: ZIError.level.error,
    }),
    instanceof: (expect) => new DateError({
        code: 102,
        name: 'instanceof',
        message: `Expect instanceof ${expect}`,
        level: ZIError.level.error,
    }),
    invalidPeriod: (period, periods) => new DateError({
        code: 103,
        name: 'invalidPeriod',
        message: `Invalid period "${period}", expect [${periods}]`,
        level: ZIError.level.error,
    }),
};
