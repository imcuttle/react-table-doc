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

function renderTypeAppend(type) {
  if (!type) {
    return null
  }
  if (typeof type === 'string') {
    return type
  }

  const { name, value } = type
  let append = null
  if (name === 'custom') {
    append = type.raw
  } else if (name === 'enum') {
    append = value.map(({ value }, i) => (
      <span key={i}>
        {i > 0 && <span>|</span>}
        {renderTypeAppend(value)}
      </span>
    ))
  } else if (name === 'arrayOf') {
    append = renderType(value) || (value && value.name)
  } else if (name === 'custom') {
    append = type.raw
  } else if (name === 'shape') {
    const keys = Object.keys(value)
    if (!!keys.length) {
      append = (
        <div>
          {keys.map(key => (
            <div key={key} className={c('prop-type-shape-each')}>
              <code>{key}</code>: <code>{renderType(value[key])}</code>
            </div>
          ))}
        </div>
      )
    }
  } else if (name === 'union') {
    append = (
      <div>
        {value.map((x, i, { length }) => (
          <span key={i} className={c('prop-type-unio-each')}>
            {renderType(x)}
            {i !== length - 1 && <span>|</span>}
          </span>
        ))}
      </div>
    )
  } else {
    append = value
  }
  return append
}

function renderType(type) {
  if (!type) {
    return null
  }
  if (typeof type === 'string') {
    return type
  }

  const { name, value } = type
  const append = renderTypeAppend(type)
  return (
    <span className={c(`prop-type prop-type-${name}`)}>
      <code>{name}</code>
      {!!append && <span className={c('prop-type-append')}>{append}</span>}
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

  componentWillMount() {
    i18n.setLanguage(this.props.lang)
  }
  componentWillReceiveProps(newProps) {
    if (newProps.lang !== this.props.lang) {
      i18n.setLanguage(newProps.lang)
      this.forceUpdate()
    }
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

  get hasProps() {
    return (
      !!this.props.data &&
      !!this.props.data.props &&
      !!Object.keys(this.props.data.props).length
    )
  }

  renderPropsTbody() {
    const {
      data: { props = {} },
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
                          __html: val.description
                            ? _marked.parse(val.description)
                            : ''
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
        {this.hasProps ? (
          <table>
            {this.renderPropsThead()}
            {this.renderPropsTbody()}
          </table>
        ) : null}
      </div>
    )
  }

  render() {
    const { className, data, hideMethods, hideProps, lang } = this.props
    return (
      <div className={cn(className, c('container', `lang-${lang}`))}>
        <h2 className={c('display-name')}>{data.displayName}</h2>
        <div
          className={c('description')}
          dangerouslySetInnerHTML={{ __html: _marked.parse(data.description) }}
        />
        {!hideProps && this.renderPropsTable()}
      </div>
    )
  }
}
