/**
 * @file main
 * @author imcuttle
 * @date 2018/4/4
 */
const main = require('../')
const { parse } = require('react-docgen')
const { readFileSync, writeFileSync } = require('fs')
const { makeFixture } = require('./helper')

describe('main', function() {
  it('should ok', function () {
    expect(1).toBe(1)
  })
})
