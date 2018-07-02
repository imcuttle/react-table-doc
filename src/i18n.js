/**
 * @file i18n
 * @author Cuttle Cong
 * @date 2018/7/1
 * @description
 */
import { createIsolateI18n } from 'tiny-i18n'

const i = createIsolateI18n()

i.setDictionary(
  {
    'th.name': 'Name',
    'th.type': 'Type',
    'th.default': 'Default',
    'th.description': 'Description'
  },
  'en-US'
)

i.setDictionary(
  {
    'th.name': '参数',
    'th.type': '类型',
    'th.default': '默认值',
    'th.description': '描述'
  },
  'zh-CN'
)

module.exports = i
