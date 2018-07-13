/**
 * @file index
 * @author Cuttle Cong
 * @date 2018/6/11
 * @description
 */

import * as React from 'react'
import PropTypes from 'prop-types'
import p from 'prefix-classname'
import _fontList from '../style/assets/icon/svg/list'

import './style.less'

export const fontList = _fontList
const req = require.context('./assets', false, /\.svg$/)
export const svgList = req
  .keys()
  .map(req)
  .map(({ id }) => id)

const cn = p('')
export const sizeList = ['small', 'normal', 'inherit', 'initial']

export default class Icon extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func,
    size: PropTypes.oneOfType([PropTypes.oneOf(sizeList), PropTypes.string]),
    className: PropTypes.string
  }
  static defaultProps = {
    size: 'inherit'
  }

  renderIcon() {
    const { name, size } = this.props

    if (svgList.includes(name)) {
      return (
        <svg
          style={{
            width: !sizeList.includes(size) ? size : null,
            height: !sizeList.includes(size) ? size : null
          }}
        >
          <use xlinkHref={`#${name}`} />
        </svg>
      )
    }

    return (
      <span
        style={{
          fontSize: !sizeList.includes(size) ? size : null
        }}
        className={cn(
          'dulife-png-icon',
          fontList.includes(size) && `dulife-icon-size-${size}`,
          {
            [`pngIcon pngIcon-${name}`]: !fontList.includes(name),
            [`dulife-icon-font dulife-icon-font-${name}`]: fontList.includes(
              name
            )
          }
        )}
      />
    )
  }

  render() {
    const { children, color, onClick, className } = this.props
    return (
      <span
        className={cn('dulife-icon', className, onClick && 'clickable')}
        style={{ color }}
        onClick={onClick}
      >
        {this.renderIcon()}
        {children != null && (
          <span className={cn('dulife-icon-label')}>{children}</span>
        )}
      </span>
    )
  }
}
