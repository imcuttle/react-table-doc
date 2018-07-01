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
  beforeAll(function () {
    writeFileSync(
      makeFixture('button.json'),
      JSON.stringify(
        parse(readFileSync(makeFixture('Button.js')).toString()),
        null,
        2
      )
    )
  })

  it('should react-docgen passed', function() {
    expect(require(makeFixture('button.json'))).toMatchSnapshot()
  })
})
