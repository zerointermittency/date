'use strict';

const Benchmark = require('benchmark'),
    moment = require('moment'),
    ZIDate = require('../ZIDate.js'),
    day1 = 1505865600000, // timestamp de 2017-09-20T00:00:00Z
    day2 = 1504224000000; // timestamp de 2017-09-01T00:00:00Z

// /*eslint-disable no-console */
// add tests
(new Benchmark.Suite)
    .add('init moment', () => moment().utc())
    .add('init date', () => new ZIDate())
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({'async': false});

(new Benchmark.Suite)
    .add('moment format', () => {
        let now = moment().utc();
        now.format('YYYY-MM-DDTHH:mm:ss[Z]');
    })
    .add('date toISOString', () => {
        let now = new ZIDate();
        now.toISOString();
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({'async': false});

(new Benchmark.Suite)
    .add('moment add seconds', () => {
        let now = moment().utc();
        now.add(10, 'seconds');
    })
    .add('date add seconds inmutable', () => {
        let now = new ZIDate();
        now.add(10, true);
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({'async': false});

(new Benchmark.Suite)
    .add('moment isSame', () => {
        let md1 = moment(day1),
            md2 = moment(day2);
        md1.isSame(md2, 'day');
    })
    .add('ZIDate equal', () => {
        let nd1 = new ZIDate(day1),
            nd2 = new ZIDate(day2);
        nd1.equal(nd2, 'day');
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({'async': false});

(new Benchmark.Suite)
    .add('diff instaces', () => {
        let nd1 = new ZIDate(day1),
            nd2 = new ZIDate(day2);
        nd1 - nd2;
    })
    .add('diff with getTime()', () => {
        let nd1 = new ZIDate(day1),
            nd2 = new ZIDate(day2);
        nd1.getTime()  - nd2.getTime();
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({'async': false});