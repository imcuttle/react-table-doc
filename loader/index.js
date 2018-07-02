/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/7/1
 * @description
 */
const { getOptions } = require('loader-utils')
const parse = require('./parse')

module.exports = function docgenLoader(content) {
  const options = getOptions(this)
  // console.log('options', options)

  return `module.exports = ${JSON.stringify(parse(content))}`
}
