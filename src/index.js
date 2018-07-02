/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/7/1
 * @description
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import p from 'prefix-classname'
import _i18n from './i18n'
import _marked from './marked'

const i = _i18n.i18n
const c = p('react-table-doc-')
const cn = p('')

export const i18n = _i18n
export const marked = _marked

function renderType(type) {
  if (!type) {
    return null
  }
  const { name, value } = type
  let append = null
  if (name === 'enum') {
    append = (
      <span className={c('prop-type-append')}>
        {value.map(({ value }) => value).join('|')}
      </span>
    )
  }
  return (
    <span className={c(`prop-type-${name}`)}>
      <code>{name}</code>
      {append}
    </span>
  )
}

export default class TableDoc extends React.Component {
  static propTypes = {
    className: PropTypes.string,
    order: PropTypes.arrayOf(PropTypes.string),
    hideMethods: PropTypes.bool,
    hideProps: PropTypes.bool,
    lang: PropTypes.string,
    data: PropTypes.object.isRequired
  }
  static defaultProps = {
    order: ['name', 'type', 'default', 'description'],
    lang: 'en-US',
    hideProps: false,
    hideMethods: false
  }

  renderPropsThead() {
    const { data, order } = this.props
    return (
      <thead>
        <tr>
          {order.map(o => (
            <th key={o} className={c(`th-prop-key-${o}`)}>
              {i(`th.${o}`)}
            </th>
          ))}
        </tr>
      </thead>
    )
  }

  renderPropsTbody() {
    const {
      data: { props },
      order
    } = this.props

    const keys = Object.keys(props)
    return (
      <tbody>
        {keys.map(key => {
          const val = props[key]
          return (
            <tr key={key} className={c(`tr-prop`, `tr-prop-key-${key}`)}>
              {order.map(o => {
                let content = null
                switch (o) {
                  case 'name':
                    content = <code>{key}</code>
                    break
                  case 'type':
                    content = renderType(val.type)
                    break
                  case 'default':
                    content = val.defaultValue && val.defaultValue.value
                    break
                  case 'description':
                    content = (
                      <span
                        dangerouslySetInnerHTML={{
                          __html: val.description ? _marked.parse(val.description) : ''
                        }}
                      />
                    )
                    break
                }
                return (
                  <td key={o} className={c(`td-prop-key-${o}`)}>
                    {content}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    )
  }

  renderPropsTable() {
    return (
      <div className={c('table-wrapper', 'table-props')}>
        <table>
          {this.renderPropsThead()}
          {this.renderPropsTbody()}
        </table>
      </div>
    )
  }

  render() {
    const { className, data, hideMethods, hideProps, lang } = this.props
    return (
      <div className={cn(className, c('container', `lang-${lang}`))}>
        <h1 className={c('display-name')}>{data.displayName}</h1>
        <div
          className={c('description')}
          dangerouslySetInnerHTML={{ __html: _marked.parse(data.description) }}
        />
        {!hideProps && this.renderPropsTable()}
      </div>
    )
  }
}
