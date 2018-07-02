/**
 * @file marked
 * @author Cuttle Cong
 * @date 2018/7/1
 * @description
 */

import * as marked from 'marked'

marked.setOptions({
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  gfm: true,
  breaks: true
})

export default marked
