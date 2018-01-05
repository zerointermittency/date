'use strict';

const error = require('./core/error.js');

class ZIDate extends Date {

    constructor() {
        super(...arguments);
    }

    static toISOString(date) {
        const pad = (number) => {
                if (number < 10) return `0${number}`;
                return number;
            },
            year = date.getUTCFullYear(),
            month = pad(date.getUTCMonth() + 1),
            day = pad(date.getUTCDate()),
            hours = pad(date.getUTCHours()),
            minutes = pad(date.getUTCMinutes()),
            seconds = pad(date.getUTCSeconds());
        return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
    }

    toISOString() {
        return ZIDate.toISOString(this);
    }

    add(seconds, inmutable) {
        if (!seconds) throw error.paramRequired;
        if (typeof seconds !== 'number') throw error.invalidType('number');
        if (inmutable) {
            let date = new ZIDate(this);
            date.setUTCSeconds(date.getUTCSeconds() + seconds);
            return date;
        }
        this.setUTCSeconds(this.getUTCSeconds() + seconds);
        return this;
    }

    substract(seconds, inmutable) {
        if (!seconds) throw error.paramRequired;
        if (typeof seconds !== 'number') throw error.invalidType('number');
        if (inmutable) {
            let date = new ZIDate(this);
            date.setUTCSeconds(date.getUTCSeconds() - seconds);
            return date;
        }
        this.setUTCSeconds(this.getUTCSeconds() - seconds);
        return this;
    }

    diff(date, period) {
        if (!date) throw error.paramRequired;
        if (!(date instanceof Date)) throw error.instanceof('Date');
        const periods = new Map(),
            // @n: wp => wrapper period
            wp = (cb, divisor) => (cb() / divisor);
        periods.set('s', () => (this.getTime() - date.getTime()) / 1000);
        periods.set('second', () => wp(periods.get('s'), 1));
        periods.set('m', () => wp(periods.get('s'), 60));
        periods.set('minute', () => wp(periods.get('m'), 1));
        periods.set('h', () => wp(periods.get('m'), 60));
        periods.set('hour', () => wp(periods.get('h'), 1));
        periods.set('D', () => wp(periods.get('h'), 24));
        periods.set('day', () => wp(periods.get('D'), 1));
        if (!period) period = 'second';
        if (!periods.has(period))
            throw error.invalidPeriod(period, ['day|D', 'hour|h', 'minute|m', 'second|s']);
        return Math.trunc(periods.get(period)());
    }

    equal(date, period) {
        if (!date) throw error.paramRequired;
        if (!(date instanceof Date)) throw error.instanceof('Date');
        const periods = new Map(),
            // @n: anda a leer sobre enum flag en javascript
            s = 1,
            m = 2,
            h = 4,
            D = 8,
            M = 16,
            Y = 32,
            getDate = (d, flag) => {
                let result = d.getUTCFullYear();
                const pad = (number) => {
                    if (number < 10) return `0${number}`;
                    return number;
                };
                if (flag & M) result = `${result}${pad(d.getUTCMonth() + 1)}`;
                if (flag & D) result = `${result}${pad(d.getUTCDate())}`;
                if (flag & h) result = `${result}${pad(d.getUTCHours())}`;
                if (flag & m) result = `${result}${pad(d.getUTCMinutes())}`;
                if (flag & s) result = `${result}${pad(d.getUTCSeconds())}`;
                return result;
            };

        periods.set('Y', Y);
        periods.set('year', periods.get('Y'));
        periods.set('M', Y | M);
        periods.set('month', periods.get('M'));
        periods.set('D', Y | M | D);
        periods.set('day', periods.get('D'));
        periods.set('h', Y | M | D | h);
        periods.set('hour', periods.get('h'));
        periods.set('m', Y | M | D | h | m);
        periods.set('minute', periods.get('m'));
        periods.set('s', Y | M | D | h | m | s);
        periods.set('second', periods.get('s'));
        if (!period) period = 'second';
        if (!periods.has(period))
            throw error.invalidPeriod(
                period, ['year|Y', 'month|M', 'day|D', 'hour|h', 'minute|m', 'second|s']
            );
        return getDate(this, periods.get(period)) === getDate(date, periods.get(period));
    }

    before(date) {
        if (!date) throw error.paramRequired;
        if (!(date instanceof Date)) throw error.instanceof('Date');
        return Math.trunc((this.getTime() - date.getTime()) / 1000) < 0;
    }

    after(date) {
        if (!date) throw error.paramRequired;
        if (!(date instanceof Date)) throw error.instanceof('Date');
        return Math.trunc((this.getTime() - date.getTime()) / 1000) > 0;
    }

}

module.exports = ZIDate;