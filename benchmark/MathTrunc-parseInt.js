'use strict';

const Benchmark = require('benchmark'),
    num = 1.868976;

// /*eslint-disable no-console */
(new Benchmark.Suite)
    .add('Math.trunc', () => Math.trunc(num))
    .add('parseInt', () => parseInt(num))
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    .run({'async': false});