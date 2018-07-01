/**
 * @file helper
 * @author Cuttle Cong
 * @date 2018/7/1
 * @description
 */
const { join } = require('path')

function makeFixture(name) {
  return join(__dirname, 'fixture', name)
}

module.exports = {
  makeFixture
}
