'use strict'

const assert = require('assert')
const arrayHelper = require('../index')

describe('module', () => {

    describe('each', () => {
        let actual = []
        let expected = []

        beforeEach((done) => {
            const longArray = range(0, 100000)
            const transformExpected = function(item) {
                if (item % 1000 === 0) {
                    expected.push(item)
                }
            }
            const transformActual = function(item) {
                if (item % 1000 === 0) {
                    actual.push(item)
                }
            }

            cloneArray(longArray).forEach(transformExpected)

            arrayHelper.each(longArray, 1000, transformActual, done)
        })

        it('runs a function on each array item', () => {
            assert.deepEqual(actual, expected)
        })
    })

    describe('map', () => {
        let actual = []
        let expected = []

        beforeEach((done) => {
            const longArray = range(0, 10)
            const transform = function(item) {
                return item * 2
            }

            expected = cloneArray(longArray).map(transform)

            arrayHelper.map(longArray, 1000, transform, (err, transformed) => {
                actual = transformed
                done()
            })
        })

        it('runs a function on each array item', () => {
            assert.deepEqual(actual, expected)
        })
    })

    describe('sort', () => {
        let actual
        let expected

        beforeEach((done) => {
            const longArray = range(0, 100000)
            const sortFunc = function(a, b) {
                if (a > b) {
                    return 1
                }
                if (a < b) {
                    return -1
                }
                return 0
            }

            expected = cloneArray(longArray).sort(sortFunc)

            arrayHelper.sort(longArray, 1000, sortFunc, (err, sorted) => {
                actual = sorted
                done()
            })
        })

        it('can sort an array', () => {
            assert.deepEqual(actual, expected)
        })
    })

})

function range(start, count) {
    let rtn = []
    for (let i = 0; i < count; i++) {
        rtn.push(i)
    }
    return rtn
}

function cloneArray(a) {
    return a.slice()
}
