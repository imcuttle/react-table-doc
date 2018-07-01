/**
 * @file i18n
 * @author Cuttle Cong
 * @date 2018/7/1
 * @description
 */
import { createIsolateI18n } from 'tiny-i18n'

const i = createIsolateI18n()

i.setDictionary({

}, 'zh-CN')

i.setDictionary({

}, 'en-US')

module.exports = i
