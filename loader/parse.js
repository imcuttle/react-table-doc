/**
 * @file parse
 * @author Cuttle Cong
 * @date 2018/7/2
 * @description
 */
const docgen = require('react-docgen')

module.exports = function parse() {
  return docgen.parse.apply(this, arguments)
}
